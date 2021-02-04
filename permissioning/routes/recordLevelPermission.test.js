
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
    dependencyInjector.register('recordLevelPermissionModel', () => require('../models/recordLevelPermission'));
    dependencyInjector.register('permissionModel', () => require('../models/permission'));
    dependencyInjector.register('recordLevelPermissionService', () => require('../services/recordLevelPermission'));
    dependencyInjector.register('permissionService', () => require('../services/permission'));
    dependencyInjector.register('recordLevelPermissionController', () => require('../controllers/recordLevelPermission'));

    const recordLevelPermissionRouter = require('./recordLevelPermission');

    beforeEach(async () => {
        const recordLevelPermissionQuery = `
        CREATE TABLE recordLevelPermission(id INTEGER PRIMARY KEY ASC, tableName TEXT, recordId INTEGER, permissionType TEXT, granteeId TEXT, get INTEGER, modify INTEGER, del INTEGER);
        INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES("string", 0, "string", "string", 0, 0, 0);
        INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES("string", 0, "string", "string", 0, 0, 0);
        `;
        await new Promise((resolve, reject) => {
            dependencyInjector.dependencies.sqlite.exec(recordLevelPermissionQuery, (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            })
        });

        await new Promise((resolve, reject) => {
            const createPermissionsAndUserQuery = `
            CREATE TABLE permission(id INTEGER PRIMARY KEY, name TEXT UNIQUE, description TEXT);
            INSERT INTO permission VALUES (1, 'RECORD_LEVEL_PERMISSION_GET', 'PLACEHOLD');
            INSERT INTO permission VALUES (2, 'RECORD_LEVEL_PERMISSION_POST', 'PLACEHOLD');
            INSERT INTO permission VALUES (3, 'RECORD_LEVEL_PERMISSION_MODIFY', 'PLACEHOLD');
            INSERT INTO permission VALUES (4, 'RECORD_LEVEL_PERMISSION_DELETE', 'PLACEHOLD');
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
                    reject(err);
                }
                else{
                    resolve(true);
                }
            });
        });

    })
    
    afterEach(async () => {
        await new Promise((resolve, reject) => {
            const dropPermissionTables = `
            DROP TABLE permission;
            DROP TABLE permissionGroup;
            DROP TABLE permissionGroupToPermission;
            DROP TABLE permissionGroupToUser;
            DROP TABLE recordLevelPermission;
            `;
            dependencyInjector.dependencies.sqlite.exec(dropPermissionTables, (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            });
        });
    })

    describe('recordLevelPermission routes tests ', () => {
        const app = express();
        app.use(express.json());
        app.use(recordLevelPermissionRouter);


        it('GET - /api/v1/recordLevelPermission', async (done) => {
            request(app)
                .get('/api/v1/recordLevelPermission')
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

        it('POST - /api/v1/recordLevelPermission', async (done) => {
            request(app)
                .post('/api/v1/recordLevelPermission')
                .set('Accept', 'application/json')
                .set('userId', 'root-user')
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

        it('PUT - /api/v1/recordLevelPermission', async (done) => {
            request(app)
                .put('/api/v1/recordLevelPermission')
                .set('Accept', 'application/json')
                .set('userId', 'root-user')
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

        it('PATCH - /api/v1/recordLevelPermission', async (done) => {
            request(app)
                .patch('/api/v1/recordLevelPermission')
                .set('Accept', 'application/json')
                .set('userId', 'root-user')
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

        it('DELETE - /api/v1/recordLevelPermission', async (done) => {
            request(app)
                .delete('/api/v1/recordLevelPermission')
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
    

    
        it('GET - /api/v1/recordLevelPermission/:id', async (done) => {
            request(app)
                .get('/api/v1/recordLevelPermission/1')
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

        it('PUT - /api/v1/recordLevelPermission/:id', async (done) => {
            request(app)
                .put('/api/v1/recordLevelPermission/1')
                .set('Accept', 'application/json')
                .set('userId', 'root-user')
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

        it('PATCH - /api/v1/recordLevelPermission/:id', async (done) => {
            request(app)
                .patch('/api/v1/recordLevelPermission/1')
                .set('Accept', 'application/json')
                .set('userId', 'root-user')
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

        it('DELETE - /api/v1/recordLevelPermission/:id', async (done) => {
            request(app)
                .delete('/api/v1/recordLevelPermission/1')
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
    