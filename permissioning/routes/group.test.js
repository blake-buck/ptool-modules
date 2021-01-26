
    const dependencyInjector = require('../dependency-injector.js');
    const express = require('express');
    const request = require('supertest');

    const {initializeSqlite, initializeStandardMiddleware} = require('../initialization');

    initializeSqlite(':memory:');
    dependencyInjector.register('groupModel', require('../models/group'));
    dependencyInjector.register('groupService', require('../services/group'));
    dependencyInjector.register('groupController', require('../controllers/group'));

    const groupRouter = require('./group');

    beforeEach(async () => {
        await new Promise((resolve, reject) => {
            dependencyInjector.dependencies.sqlite.run('CREATE TABLE group(id INTEGER PRIMARY KEY ASC, name TEXT, description TEXT);', (err) => {
                if(err){
                    reject(err);
                }
                else{
                    dependencyInjector.dependencies.sqlite.run('INSERT INTO group(name, description) VALUES("string", "string");', (err) => {
                        if(err){
                            reject(err);
                        }
                        else{
                            dependencyInjector.dependencies.sqlite.run('INSERT INTO group(name, description) VALUES("string", "string");', (err) => {
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
            dependencyInjector.dependencies.sqlite.run('DROP TABLE group', (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            });
        })
    })

    describe('group routes tests ', () => {
        const app = express();
        initializeStandardMiddleware(app);
        app.use(groupRouter);


        it('GET - /group', async (done) => {
            request(app)
                .get('/group')
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

        it('POST - /group', async (done) => {
            request(app)
                .post('/group')
                .set('Accept', 'application/json')
                .send({"name":"string","description":"string"})
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

        it('PUT - /group', async (done) => {
            request(app)
                .put('/group')
                .set('Accept', 'application/json')
                .send([{"id":1,"name":"string","description":"string"}])
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

        it('PATCH - /group', async (done) => {
            request(app)
                .patch('/group')
                .set('Accept', 'application/json')
                .send([{"id":1,"name":"string","description":"string"}])
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

        it('DELETE - /group', async (done) => {
            request(app)
                .delete('/group')
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
    

    
        it('GET - /group/:id', async (done) => {
            request(app)
                .get('/group/1')
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

        it('PUT - /group/:id', async (done) => {
            request(app)
                .put('/group/1')
                .set('Accept', 'application/json')
                .send({"id":1,"name":"string","description":"string"})
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

        it('PATCH - /group/:id', async (done) => {
            request(app)
                .patch('/group/1')
                .set('Accept', 'application/json')
                .send({"name":"string","description":"string"})
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

        it('DELETE - /group/:id', async (done) => {
            request(app)
                .delete('/group/1')
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
    