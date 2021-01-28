
    const dependencyInjector = require('../dependency-injector.js');
    const express = require('express');
    const request = require('supertest');

    const {initializeSqlite, initializeStandardMiddleware} = require('../initialization');

    initializeSqlite(':memory:');
    dependencyInjector.register('recordLevelPermissionModel', require('../models/recordLevelPermission'));
    dependencyInjector.register('recordLevelPermissionService', require('../services/recordLevelPermission'));
    dependencyInjector.register('recordLevelPermissionController', require('../controllers/recordLevelPermission'));

    const recordLevelPermissionRouter = require('./recordLevelPermission');

    beforeEach(async () => {
        await new Promise((resolve, reject) => {
            dependencyInjector.dependencies.sqlite.run('CREATE TABLE recordLevelPermission(id INTEGER PRIMARY KEY ASC, tableName TEXT, recordId INTEGER, permissionType TEXT, granteeId TEXT, get INTEGER, modify INTEGER, del INTEGER);', (err) => {
                if(err){
                    reject(err);
                }
                else{
                    dependencyInjector.dependencies.sqlite.run('INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES("string", 0, "string", "string", 0, 0, 0);', (err) => {
                        if(err){
                            reject(err);
                        }
                        else{
                            dependencyInjector.dependencies.sqlite.run('INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES("string", 0, "string", "string", 0, 0, 0);', (err) => {
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
            dependencyInjector.dependencies.sqlite.run('DROP TABLE recordLevelPermission', (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            });
        })
    })

    describe('recordLevelPermission routes tests ', () => {
        const app = express();
        initializeStandardMiddleware(app);
        app.use(recordLevelPermissionRouter);


        it('GET - /recordLevelPermission', async (done) => {
            request(app)
                .get('/recordLevelPermission')
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

        it('POST - /recordLevelPermission', async (done) => {
            request(app)
                .post('/recordLevelPermission')
                .set('Accept', 'application/json')
                .send({"tableName":"string","recordId":0,"permissionType":"string","granteeId":"string","get":0,"modify":0,"del":0})
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

        it('PUT - /recordLevelPermission', async (done) => {
            request(app)
                .put('/recordLevelPermission')
                .set('Accept', 'application/json')
                .send([{"id":1,"tableName":"string","recordId":0,"permissionType":"string","granteeId":"string","get":0,"modify":0,"del":0}])
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

        it('PATCH - /recordLevelPermission', async (done) => {
            request(app)
                .patch('/recordLevelPermission')
                .set('Accept', 'application/json')
                .send([{"id":1,"tableName":"string","recordId":0,"permissionType":"string","granteeId":"string","get":0,"modify":0,"del":0}])
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

        it('DELETE - /recordLevelPermission', async (done) => {
            request(app)
                .delete('/recordLevelPermission')
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
    

    
        it('GET - /recordLevelPermission/:id', async (done) => {
            request(app)
                .get('/recordLevelPermission/1')
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

        it('PUT - /recordLevelPermission/:id', async (done) => {
            request(app)
                .put('/recordLevelPermission/1')
                .set('Accept', 'application/json')
                .send({"id":1,"tableName":"string","recordId":0,"permissionType":"string","granteeId":"string","get":0,"modify":0,"del":0})
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

        it('PATCH - /recordLevelPermission/:id', async (done) => {
            request(app)
                .patch('/recordLevelPermission/1')
                .set('Accept', 'application/json')
                .send({"tableName":"string","recordId":0,"permissionType":"string","granteeId":"string","get":0,"modify":0,"del":0})
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

        it('DELETE - /recordLevelPermission/:id', async (done) => {
            request(app)
                .delete('/recordLevelPermission/1')
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
    