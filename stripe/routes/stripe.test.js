const dependencyInjector = require('../dependency-injector');
const {initializeStandardMiddleware, initializeStripe} = require('../initialization');
initializeStripe();

dependencyInjector.register('stripeService', () => require('../services/stripe'));
dependencyInjector.register('stripeController', () => require('../controllers/stripe'))
const stripeRouter = require('./stripe');


const express = require('express');
const request = require('supertest');

let customerId = '';
let cardId = '';
let source = 'tok_visa';
let priceId = '';
let subscriptionId = '';
let productId = '';
beforeAll(async () => {
    const customerResult = await dependencyInjector.dependencies.stripe.customers.create({
        email: 'test@emailtwo.com'
    });
    customerId = customerResult.id;

    const cardResult = await dependencyInjector.dependencies.stripe.customers.createSource({
        customer: customerId,
        source
    });
    cardId = cardResult.id;

    const priceResult = await dependencyInjector.dependencies.stripe.prices.create({
        currency:'USD',
        unit_amount:100
    })
    priceId = priceResult.id;

    const subscriptionResult = await dependencyInjector.dependencies.stripe.subscriptions.create({
        customer: customerId,
        items:[
            {price: priceId}
        ]
    })
    subscriptionId = subscriptionResult.id;

    const productResult = await dependencyInjector.dependencies.stripe.products.create({
        active:true,
        name:'test product'
    })

    productId = productResult.id;
})

describe('stripe route tests', () => {
    const app = express();
    initializeStandardMiddleware(app);
    app.use(stripeRouter);

    it('GET - /stripe/customers', async (done) => {
        request(app)
            .get(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })

    it('GET - /stripe/customer/:customerId', async (done) => {
        request(app)
            .get(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })

    it('POST - /stripe/customer', async (done) => {
        request(app)
            .post(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })

    it('PUT - /stripe/customer/:customerId', async (done) => {
        request(app)
            .put(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })

    it('DELETE - /stripe/customer/:customerId', async (done) => {
        request(app)
            .delete(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })

    it('GET - /stripe/customer/:customerId/card/:cardId', async (done) => {
        request(app)
            .get(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })

    it('POST - /stripe/customer/:customerId/card', async (done) => {
        request(app)
            .post(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })

    it('PUT - stripe/customer/:customerId/card/:cardId', async (done) => {
        request(app)
            .put(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })

    it('DELETE - /stripe/customer/:customerId/card/:cardId', async (done) => {
        request(app)
            .delete(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })


    it('GET - /stripe/subscriptions', async (done) => {
        request(app)
            .get(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })

    it('GET - /stripe/subscription/:subscriptionId', async (done) => {
        request(app)
            .get(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })

    it('POST - /stripe/subscription', async (done) => {
        request(app)
            .post(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })

    it('PUT - /stripe/subscription/:subscriptionId', async (done) => {
        request(app)
            .put(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })

    it('DELETE - /stripe/subscription/:subscriptionId', async (done) => {
        request(app)
            .delete(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })


    it('GET - /stripe/products', async (done) => {
        request(app)
            .get(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })

    it('GET - /stripe/product/:productId', async (done) => {
        request(app)
            .get(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })

    it('POST - /stripe/product', async (done) => {
        request(app)
            .post(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })

    it('PUT - /stripe/product/:productId', async (done) => {
        request(app)
            .put(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })

    it('DELETE - /stripe/product/:productId', async (done) => {
        request(app)
            .delete(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })


    it('GET - /stripe/prices', async (done) => {
        request(app)
            .get(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })

    it('GET - /stripe/price/:priceId', async (done) => {
        request(app)
            .get(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })

    it('POST - /stripe/price', async (done) => {
        request(app)
            .post(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })

    it('PUT - /stripe/price/:priceId', async (done) => {
        request(app)
            .put(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })

    it('DELETE - /stripe/price/:priceId', async (done) => {
        request(app)
            .delete(``)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err){
                    console.error(err);
                    console.log(res.error)
                    done();
                }
                expect(res.body).toBeTruthy();
                done();
            })
    })

    
})