const express = require('express');
const request = require('supertest');

const {initializeSqlite, sqlite, initializeStandardMiddleware} = require('../initialization');

beforeEach(async () => {
    initializeSqlite(':memory:');
    await new Promise((resolve, reject) => {
        sqlite.db.run(`CREATE TABLE example(id INTEGER PRIMARY KEY ASC, description TEXT, status INTEGER);`, (err) => {
        if(err){
            reject(err);
        }
        else{
            sqlite.db.run(`INSERT INTO example(description, status) VALUES('Example 1', 0);`, (err) => {
                if(err){
                    reject(err);
                }
                else{
                    sqlite.db.run(`INSERT INTO example(description, status) VALUES('Example 2', 0);`, (err) => {
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
        sqlite.db.run('DROP TABLE example', (err) => {
            if(err){
                reject(err);
            }
            else{
                resolve(true);
            }
        });
    })
})
const exampleRouter = require('./example');


describe('example route tests', () => {
    initializeSqlite(':memory:');
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
    it('PUT - /example', async (done) => {
        request(app)
            .put('/example')
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
    it('DELETE - /example', async (done) => {
        request(app)
            .delete('/example')
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