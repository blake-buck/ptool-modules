const express = require('express');
const request = require('supertest');
const dependencyInjector = require('../dependency-injector.js')
const {initializeSqlite, initializeStandardMiddleware} = require('../initialization');

initializeSqlite(':memory:');

dependencyInjector.register('exampleModel', require('../models/example'));

dependencyInjector.register('exampleService', require('../services/example'));

dependencyInjector.register('exampleController', require('../controllers/example'));

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

    it('GET - /example', async (done) => {
        request(app)
            .get('/example')
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
    it('POST - /example', async (done) => {
        request(app)
            .post('/example')
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
    it('PUT - /example', async (done) => {
        request(app)
            .put('/example')
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
    it('PATCH - /example', async (done) => {
        request(app)
            .patch('/example')
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
    it('DELETE - /example', async (done) => {
        request(app)
            .delete('/example')
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


    it('GET - /example/:id', async (done) => {
        request(app)
            .get('/example/1')
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
    it('PUT - /example/:id', async (done) => {
        request(app)
            .put('/example/1')
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
    it('PATCH - /example/:id', async (done) => {
        request(app)
            .patch('/example/1')
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
    it('DELETE - /example/:id', async (done) => {
        request(app)
            .delete('/example/1')
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