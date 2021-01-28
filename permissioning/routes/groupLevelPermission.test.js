
    const dependencyInjector = require('../dependency-injector.js');
    const express = require('express');
    const request = require('supertest');

    const {initializeSqlite, initializeStandardMiddleware} = require('../initialization');

    initializeSqlite(':memory:');
    dependencyInjector.register('groupLevelPermissionModel', require('../models/groupLevelPermission'));
    dependencyInjector.register('groupLevelPermissionService', require('../services/groupLevelPermission'));
    dependencyInjector.register('groupLevelPermissionController', require('../controllers/groupLevelPermission'));

    const groupLevelPermissionRouter = require('./groupLevelPermission');

    beforeEach(async () => {
        await new Promise((resolve, reject) => {
            dependencyInjector.dependencies.sqlite.run('CREATE TABLE groupLevelPermission(id INTEGER PRIMARY KEY ASC, tableName TEXT, groupId INTEGER, permissionType TEXT, granteeId TEXT, get INTEGER, post INTEGER);', (err) => {
                if(err){
                    reject(err);
                }
                else{
                    dependencyInjector.dependencies.sqlite.run('INSERT INTO groupLevelPermission(tableName, groupId, permissionType, granteeId, get, post) VALUES("string", 0, "string", "string", 0, 0);', (err) => {
                        if(err){
                            reject(err);
                        }
                        else{
                            dependencyInjector.dependencies.sqlite.run('INSERT INTO groupLevelPermission(tableName, groupId, permissionType, granteeId, get, post) VALUES("string", 0, "string", "string", 0, 0);', (err) => {
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
            dependencyInjector.dependencies.sqlite.run('DROP TABLE groupLevelPermission', (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            });
        })
    })

    describe('groupLevelPermission routes tests ', () => {
        const app = express();
        initializeStandardMiddleware(app);
        app.use(groupLevelPermissionRouter);


        it('GET - /groupLevelPermission', async (done) => {
            request(app)
                .get('/groupLevelPermission')
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

        it('POST - /groupLevelPermission', async (done) => {
            request(app)
                .post('/groupLevelPermission')
                .set('Accept', 'application/json')
                .send({"tableName":"string","groupId":0,"permissionType":"string","granteeId":"string","get":0,"post":0})
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

        it('PUT - /groupLevelPermission', async (done) => {
            request(app)
                .put('/groupLevelPermission')
                .set('Accept', 'application/json')
                .send([{"id":1,"tableName":"string","groupId":0,"permissionType":"string","granteeId":"string","get":0,"post":0}])
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

        it('PATCH - /groupLevelPermission', async (done) => {
            request(app)
                .patch('/groupLevelPermission')
                .set('Accept', 'application/json')
                .send([{"id":1,"tableName":"string","groupId":0,"permissionType":"string","granteeId":"string","get":0,"post":0}])
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

        it('DELETE - /groupLevelPermission', async (done) => {
            request(app)
                .delete('/groupLevelPermission')
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
    

    
        it('GET - /groupLevelPermission/:id', async (done) => {
            request(app)
                .get('/groupLevelPermission/1')
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

        it('PUT - /groupLevelPermission/:id', async (done) => {
            request(app)
                .put('/groupLevelPermission/1')
                .set('Accept', 'application/json')
                .send({"id":1,"tableName":"string","groupId":0,"permissionType":"string","granteeId":"string","get":0,"post":0})
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

        it('PATCH - /groupLevelPermission/:id', async (done) => {
            request(app)
                .patch('/groupLevelPermission/1')
                .set('Accept', 'application/json')
                .send({"tableName":"string","groupId":0,"permissionType":"string","granteeId":"string","get":0,"post":0})
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

        it('DELETE - /groupLevelPermission/:id', async (done) => {
            request(app)
                .delete('/groupLevelPermission/1')
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
    