
    const dependencyInjector = require('../dependency-injector.js');
    const express = require('express');
    const request = require('supertest');
    dependencyInjector.register('recordLevelPermissionService', () => ({}));
    dependencyInjector.register('permissionGroupToUserModel', () => ({}));
    dependencyInjector.register('permissionGroupToPermissionModel', () => ({}));
    dependencyInjector.register('permissionModel', () => ({}));
    dependencyInjector.register('groupLevelPermissionService', () => ({}));
    const {initializeSqlite} = require('../initialization');

    initializeSqlite(':memory:');
    dependencyInjector.register('permissionGroupToPermissionModel', require('../models/permissionGroupToPermission'));
    dependencyInjector.register('permissionGroupToPermissionService', require('../services/permissionGroupToPermission'));
    dependencyInjector.register('permissionGroupToPermissionController', require('../controllers/permissionGroupToPermission'));

    const permissionGroupToPermissionRouter = require('./permissionGroupToPermission');

    beforeEach(async () => {
        await new Promise((resolve, reject) => {
            dependencyInjector.dependencies.sqlite.run('CREATE TABLE permissionGroupToPermission(id INTEGER PRIMARY KEY ASC, groupId INTEGER, permissionId INTEGER);', (err) => {
                if(err){
                    reject(err);
                }
                else{
                    dependencyInjector.dependencies.sqlite.run('INSERT INTO permissionGroupToPermission(groupId, permissionId) VALUES(0, 0);', (err) => {
                        if(err){
                            reject(err);
                        }
                        else{
                            dependencyInjector.dependencies.sqlite.run('INSERT INTO permissionGroupToPermission(groupId, permissionId) VALUES(0, 0);', (err) => {
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
            dependencyInjector.dependencies.sqlite.run('DROP TABLE permissionGroupToPermission', (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            });
        })
    })

    describe('permissionGroupToPermission routes tests ', () => {
        const app = express();
        app.use(express.json());
        app.use(permissionGroupToPermissionRouter);


        it('GET - /permissionGroupToPermission', async (done) => {
            request(app)
                .get('/permissionGroupToPermission')
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

        it('POST - /permissionGroupToPermission', async (done) => {
            request(app)
                .post('/permissionGroupToPermission')
                .set('Accept', 'application/json')
                .send({"groupId":0,"permissionId":0})
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

        it('PUT - /permissionGroupToPermission', async (done) => {
            request(app)
                .put('/permissionGroupToPermission')
                .set('Accept', 'application/json')
                .send([{"id":1,"groupId":0,"permissionId":0}])
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

        it('PATCH - /permissionGroupToPermission', async (done) => {
            request(app)
                .patch('/permissionGroupToPermission')
                .set('Accept', 'application/json')
                .send([{"id":1,"groupId":0,"permissionId":0}])
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

        it('DELETE - /permissionGroupToPermission', async (done) => {
            request(app)
                .delete('/permissionGroupToPermission')
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
    

    
        it('GET - /permissionGroupToPermission/:id', async (done) => {
            request(app)
                .get('/permissionGroupToPermission/1')
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

        it('PUT - /permissionGroupToPermission/:id', async (done) => {
            request(app)
                .put('/permissionGroupToPermission/1')
                .set('Accept', 'application/json')
                .send({"id":1,"groupId":0,"permissionId":0})
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

        it('PATCH - /permissionGroupToPermission/:id', async (done) => {
            request(app)
                .patch('/permissionGroupToPermission/1')
                .set('Accept', 'application/json')
                .send({"groupId":0,"permissionId":0})
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

        it('DELETE - /permissionGroupToPermission/:id', async (done) => {
            request(app)
                .delete('/permissionGroupToPermission/1')
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
    