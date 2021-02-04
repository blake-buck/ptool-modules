const express = require('express');
const request = require('supertest');
const dependencyInjector = require('../dependency-injector.js')
const {initializeSqlite, initializeStandardMiddleware} = require('../initialization');

initializeSqlite(':memory:');

dependencyInjector.register('exampleModel', () => require('../models/example'));

dependencyInjector.register('exampleService', () => require('../services/example'));

dependencyInjector.register('exampleController', () => require('../controllers/example'));

const exampleRouter = require('./example');

beforeEach(async () => {
    await new Promise((resolve, reject) => {
        dependencyInjector.dependencies.sqlite.run(`CREATE TABLE example(id INTEGER PRIMARY KEY ASC, description TEXT, status INTEGER);`, (err) => {
        if(err){
            reject(err);
        }
        else{
            dependencyInjector.dependencies.sqlite.run(`INSERT INTO example(description, status) VALUES('Example 1', 0);`, (err) => {
                if(err){
                    reject(err);
                }
                else{
                    dependencyInjector.dependencies.sqlite.run(`INSERT INTO example(description, status) VALUES('Example 2', 0);`, (err) => {
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(true);
                        }
                    })
                }
            })
        }
    })
    });
})

afterEach(async () => {
    await new Promise((resolve, reject) => {
        dependencyInjector.dependencies.sqlite.run('DROP TABLE example', (err) => {
            if(err){
                reject(err);
            }
            else{
                resolve(true);
            }
        });
    })
})


describe('example route tests', () => {
    const app = express();
    initializeStandardMiddleware(app);
    app.use(exampleRouter);

    it('GET - /api/v1/example', async (done) => {
        request(app)
            .get('/api/v1/example')
            .set('Accept', 'application/json')
            .send({})
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
            });
    });
    it('POST - /api/v1/example', async (done) => {
        request(app)
            .post('/api/v1/example')
            .set('Accept', 'application/json')
            .send({
                description: 'description',
                status: 1
            })
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
            });
    });
    it('PUT - /api/v1/example', async (done) => {
        request(app)
            .put('/api/v1/example')
            .set('Accept', 'application/json')
            .send([{
                id: 1,
                description: 'updated description',
                status: 3
            }])
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
            });
    });
    it('PATCH - /api/v1/example', async (done) => {
        request(app)
            .patch('/api/v1/example')
            .set('Accept', 'application/json')
            .send([{
                id: 1,
                description: 'updated description',
                status: 3
            }])
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
            });
    });
    it('DELETE - /api/v1/example', async (done) => {
        request(app)
            .delete('/api/v1/example')
            .set('Accept', 'application/json')
            .send([1,2])
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
            });
    });


    it('GET - /api/v1/example/:id', async (done) => {
        request(app)
            .get('/api/v1/example/1')
            .set('Accept', 'application/json')
            .send({})
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
            });
    });
    it('PUT - /api/v1/example/:id', async (done) => {
        request(app)
            .put('/api/v1/example/1')
            .set('Accept', 'application/json')
            .send({
                id:1,
                description:'1234 jeff',
                status:3
            })
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
            });
    });
    it('PATCH - /api/v1/example/:id', async (done) => {
        request(app)
            .patch('/api/v1/example/1')
            .set('Accept', 'application/json')
            .send({
                description:'1234 jeff',
                status:3
            })
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
            });
    });
    it('DELETE - /api/v1/example/:id', async (done) => {
        request(app)
            .delete('/api/v1/example/1')
            .set('Accept', 'application/json')
            .send({})
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
            });
    });

})