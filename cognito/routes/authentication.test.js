const dependencyInjector = require('../dependency-injector');

const {initializeCognito, initializeStandardMiddleware} = require('../initialization');

initializeCognito();
dependencyInjector.register('authenticationService', require('../services/authentication'));
dependencyInjector.register('authenticationController', require('../controllers/authentication'));

const request = require('supertest');
const authRouter = require('./authentication.js');
const express = require('express');

const {
    AWS_USER_POOL_ID,
    AWS_CLIENT_ID,
    AWS_COGNITO_SERVER_NAME
} = require('../config');

const {createSecretHash, formatHeaders}  = require('../services/authentication');

const ip='127.0.0.1';
describe('authentication route testing', () => {
    const app = express();
    initializeStandardMiddleware(app);
    app.use(authRouter);

    const username = 'blakemanbuck@gmail.com';
    const password = 'temporaryPassword1!';

    let authenticationToken;
    let refresh;

    it('/register', async (done) => {
        request(app)
            .post('/api/v1/register')
            .set('Accept', 'application/json')
            .send({username, password})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body.message).toBeTruthy();
                // for testing purposes, this user needs to be automatically confirmed
                await dependencyInjector.dependencies.cognito.adminConfirmSignUp({
                    UserPoolId:AWS_USER_POOL_ID,
                    Username:username
                }).promise();
                done();
            });

        

    });

    it('/login', async (done) => {
        request(app)
            .post('/api/v1/login')
            .set('Accept', 'application/json')
            .send({username, password})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if(err){
                    done(err);
                }
                expect(res.body.AuthenticationResult).toBeTruthy();
                refresh=res.body.AuthenticationResult.RefreshToken;
                authenticationToken = res.body.AuthenticationResult.AccessToken;
                done();
            });
    });

    it('/refresh-token', async (done) => {
        request(app)
            .post('/api/v1/refresh-token')
            .set('Accept', 'application/json')
            .set('jwt', authenticationToken)
            .send({refresh})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if(err){
                    done(err);
                }
                expect(res.body.AuthenticationResult).toBeTruthy();
                done();
            })
    });

    it('/change-password', async (done) => {
        request(app)
            .post('/api/v1/change-password')
            .set('Accept', 'application/json')
            .set('jwt', authenticationToken)
            .send({previousPassword: password, proposedPassword: 'temporaryPassword2@'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    done(err);
                }
                expect(res.body).toBeTruthy();
                done();
            })
    });

    it('/forgot-password', async (done) => {
        request(app)
            .post('/api/v1/forgot-password')
            .set('Accept', 'application/json')
            .send({username})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if(err){
                    done(err)
                }
                expect(res.body.CodeDeliveryDetails).toBeTruthy();
                done();
            })
    });

    // // /forgot-password/confirm => since an email inbox is needed for this one, this gets a little more difficult to test; imo if every other test is successful, it makes sense that this route would be ok as well

    it('/delete-account', async (done) => {
        const authResult = await dependencyInjector.dependencies.cognito.adminInitiateAuth({
            AuthFlow:   'ADMIN_USER_PASSWORD_AUTH',
            UserPoolId: AWS_USER_POOL_ID,
            ClientId:   AWS_CLIENT_ID,
            
            AuthParameters:{
                USERNAME: username,
                PASSWORD: 'temporaryPassword2@',
                SECRET_HASH: createSecretHash(username)
            },
    
            ContextData:{
                IpAddress:   ip,
                ServerName:  AWS_COGNITO_SERVER_NAME,
                ServerPath:  '/api/login',
                HttpHeaders: formatHeaders({})
            }
        }).promise();
        authenticationToken=authResult.AuthenticationResult.AccessToken;
        request(app)
            .post('/api/v1/delete-account')
            .set('Accept', 'application/json')
            .set('jwt', authenticationToken)
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if(err){
                    done(err)
                }
                expect(res.body).toBeTruthy();
                done();
            })
    });

});

