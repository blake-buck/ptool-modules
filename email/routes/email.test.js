const dependencyInjector = require('../dependency-injector');
const request = require('supertest');
const express = require('express');
const nodemailer = require('nodemailer');

dependencyInjector.register(
    'emailTransport', 
    () => nodemailer.createTransport({
        jsonTransport:true
    })
)
dependencyInjector.register('emailController', () => require('../controllers/email'));
dependencyInjector.register('emailService', () => require('../services/email'));

const {initializeStandardMiddleware} = require('../initialization');
const emailRouter = require('./email');

const app = express();
initializeStandardMiddleware(app);
app.use(emailRouter);

describe('email route tests', () => {
    it('POST - /email', async (done) => {
        request(app)
            .post('/email')
            .set('Accept', 'application/json')
            .send({
                to:'test@email.com',
                subject:'A subject',
                text:'test test test'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, response) => {
                if(err) {
                    console.log(err);
                    return done();
                }
                expect(response.body.message).toBeTruthy();
                done();
            })
    })
})