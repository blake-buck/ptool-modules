
    const dependencyInjector = require('../dependency-injector.js');
    const express = require('express');
    const request = require('supertest');

    dependencyInjector.register('recordLevelPermissionService', () => ({}));
    dependencyInjector.register('permissionGroupToUserModel', () => ({}));
    dependencyInjector.register('permissionGroupToPermissionModel', () => ({}));
    dependencyInjector.register('groupLevelPermissionService', () => ({}));

    const {initializeSqlite} = require('../initialization');

    initializeSqlite(':memory:');
    dependencyInjector.register('permissionModel', require('../models/permission'));
    dependencyInjector.register('groupLevelPermissionModel', require('../models/groupLevelPermission'));
    dependencyInjector.register('permissionService', require('../services/permission'));
    dependencyInjector.register('groupLevelPermissionService', require('../services/groupLevelPermission'));
    dependencyInjector.register('groupLevelPermissionController', require('../controllers/groupLevelPermission'));

    const groupLevelPermissionRouter = require('./groupLevelPermission');

    beforeEach(async () => {
        await new Promise((resolve, reject) => {
            const createPermissionsAndUserQuery = `
            CREATE TABLE permission(id INTEGER PRIMARY KEY, name TEXT UNIQUE, description TEXT);
            INSERT INTO permission VALUES (1, 'GROUP_LEVEL_PERMISSION_GET', 'PLACEHOLD');
            INSERT INTO permission VALUES (2, 'GROUP_LEVEL_PERMISSION_POST', 'PLACEHOLD');
            INSERT INTO permission VALUES (3, 'GROUP_LEVEL_PERMISSION_MODIFY', 'PLACEHOLD');
            INSERT INTO permission VALUES (4, 'GROUP_LEVEL_PERMISSION_DELETE', 'PLACEHOLD');
            CREATE TABLE permissionGroup(id INTEGER PRIMARY KEY, name TEXT UNIQUE, description TEXT);
            INSERT INTO permissionGroup VALUES (1, 'root', 'placehold');
            CREATE TABLE permissionGroupToPermission(id INTEGER PRIMARY KEY, groupId INTEGER, permissionId INTEGER);
            INSERT INTO permissionGroupToPermission VALUES (1, 1, 1);
            INSERT INTO permissionGroupToPermission VALUES (2, 1, 2);
            INSERT INTO permissionGroupToPermission VALUES (3, 1, 3);
            INSERT INTO permissionGroupToPermission VALUES (4, 1, 4);
            CREATE TABLE permissionGroupToUser(id INTEGER PRIMARY KEY, userId TEXT, groupId INTEGER);
            INSERT INTO permissionGroupToUser VALUES (1, 'root-user', 1);
            `
            dependencyInjector.dependencies.sqlite.exec(createPermissionsAndUserQuery, (err) => {
                if(err){
                    console.error(err)
                    reject(err);
                }
                else{
                    resolve(true);
                }
            })
        })

        await new Promise((resolve, reject) => {
            const groupLevelPermissionQuery = `
            CREATE TABLE groupLevelPermission(id INTEGER PRIMARY KEY, tableName TEXT, groupId INTEGER, permissionType TEXT, granteeId TEXT, get INTEGER, post INTEGER);
            INSERT INTO groupLevelPermission(tableName, groupId, permissionType, granteeId, get, post) VALUES("string", 0, "string", "string", 0, 0);
            INSERT INTO groupLevelPermission(tableName, groupId, permissionType, granteeId, get, post) VALUES("string", 0, "string", "string", 0, 0);
            `;
            dependencyInjector.dependencies.sqlite.exec(groupLevelPermissionQuery, (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            })
        });
    })
    
    afterEach(async () => {
        await new Promise((resolve, reject) => {
            const dropPermissionTables = `
            DROP TABLE permission;
            DROP TABLE permissionGroup;
            DROP TABLE permissionGroupToPermission;
            DROP TABLE permissionGroupToUser;
            `;
            dependencyInjector.dependencies.sqlite.exec(dropPermissionTables, (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            })
        })
        await new Promise((resolve, reject) => {
            dependencyInjector.dependencies.sqlite.exec('DROP TABLE groupLevelPermission;', (err) => {
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
        app.use(express.json());
        app.use(groupLevelPermissionRouter);


        it('GET - /groupLevelPermission', async (done) => {
            request(app)
                .get('/groupLevelPermission')
                .set('Accept', 'application/json')
                .set('userId', 'root-user')
                .send({})
                .expect('Content-Type', /json/)
                .expect(200)
                .end(async (err, res) => {
                    if(err){
                        console.error(err);
                        console.log(res.error)
                        done();
                    }
                    else{
                        expect(res.body).toBeTruthy();
                    }
                    done();
                });
        });

        it('POST - /groupLevelPermission', async (done) => {
            request(app)
                .post('/groupLevelPermission')
                .set('Accept', 'application/json')
                .set('userId', 'root-user')
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
                .set('userId', 'root-user')
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
                .set('userId', 'root-user')
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
                .set('userId', 'root-user')
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
                .set('userId', 'root-user')
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
                .set('userId', 'root-user')
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
                .set('userId', 'root-user')
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
                .set('userId', 'root-user')
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
    