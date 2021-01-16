const express = require('express');
const request = require('supertest');

const authenticationRouter = require('./authentication');
const {initializeFirebaseAuth, firebase, initializeStandardMiddleware} = require('../initialization');

describe('Firebase authentication routes', () => {
    initializeFirebaseAuth();
    const app = express();
    initializeStandardMiddleware(app);
    app.use(authenticationRouter);

    const username='blake.buck@hey.com';
    const email = username
    const password='temporaryPassword@1';
    const previousPassword =password
    const proposedPassword ='temporaryPassword@2';

    let jwt='';

    it('/register', async (done) => {
        request(app)
            .post('/register')
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
                const {uid} = await firebase.admin.getUserByEmail(email);
                await firebase.admin.updateUser(uid, {emailVerified: true});

                done();
            });
    });

    it('/login', async (done) => {
        request(app)
            .post('/login')
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

                expect(res.body.jwt).toBeTruthy();
                jwt = res.body.jwt;
                done();
            });
    });

    it('/change-password', async (done) => {
        request(app)
            .post('/change-password')
            .set('Accept', 'application/json')
            .set('jwt', jwt)
            .send({previousPassword, proposedPassword})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }

                expect(res.body.message).toBeTruthy();
                done();
            });
    });

    it('/forgot-password', async (done) => {
        request(app)
            .post('/forgot-password')
            .set('Accept', 'application/json')
            .send({email})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body.message).toBeTruthy();
                const {uid} = await firebase.admin.getUserByEmail(email);
                await firebase.admin.updateUser(uid, {password: proposedPassword});
                done();
            });
    });

    it('/delete-account', async (done) => {
        
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send({
                username, 
                password: proposedPassword
            })
            .expect('Content-Type', /json/)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                else{
                    console.log(res.body)

                    request(app)
                        .post('/delete-account')
                        .set('Accept', 'application/json')
                        .set('jwt', res.body.jwt)
                        .send({})
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(async (err, res) => {
                            if(err){
                                console.error(err);
                                console.log(res.error)
                                done();
                            }
    
                            expect(res.body.message).toBeTruthy();
                            done();
                        });
                }
                
            });
    });
})