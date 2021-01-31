
    const dependencyInjector = require('../dependency-injector.js');
    const express = require('express');
    const request = require('supertest');
    
    dependencyInjector.register('recordLevelPermissionService', () => ({}));
    dependencyInjector.register('permissionGroupToUserModel', () => ({}));
    dependencyInjector.register('permissionGroupToPermissionModel', () => ({}));
    dependencyInjector.register('permissionModel', () => ({}));
    dependencyInjector.register('groupLevelPermissionService', () => ({}));
    
    const {initializeSqlite, initializeStandardMiddleware} = require('../initialization');

    initializeSqlite(':memory:');
    dependencyInjector.register('permissionModel', require('../models/permission'));
    dependencyInjector.register('permissionGroupModel', require('../models/permissionGroup'));
    dependencyInjector.register('permissionGroupService', require('../services/permissionGroup'));
    dependencyInjector.register('permissionService', require('../services/permission'));
    dependencyInjector.register('permissionGroupController', require('../controllers/permissionGroup'));

    const permissionGroupRouter = require('./permissionGroup');

    beforeEach(async () => {
        await new Promise((resolve, reject) => {
            const createPermissionsAndUserQuery = `
            CREATE TABLE permission(id INTEGER PRIMARY KEY, name TEXT UNIQUE, description TEXT);
            INSERT INTO permission VALUES (1, 'PERMISSION_GROUP_GET', 'PLACEHOLD');
            INSERT INTO permission VALUES (2, 'PERMISSION_GROUP_POST', 'PLACEHOLD');
            INSERT INTO permission VALUES (3, 'PERMISSION_GROUP_MODIFY', 'PLACEHOLD');
            INSERT INTO permission VALUES (4, 'PERMISSION_GROUP_DELETE', 'PLACEHOLD');
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
    });
    
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
            });
        });
    });

    describe('permissionGroup routes tests ', () => {
        const app = express();
        initializeStandardMiddleware(app);
        app.use(permissionGroupRouter);


        it('GET - /permissionGroup', async (done) => {
            request(app)
                .get('/permissionGroup')
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

        it('POST - /permissionGroup', async (done) => {
            request(app)
                .post('/permissionGroup')
                .set('Accept', 'application/json')
                .set('userId', 'root-user')
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

        it('PUT - /permissionGroup', async (done) => {
            request(app)
                .put('/permissionGroup')
                .set('Accept', 'application/json')
                .set('userId', 'root-user')
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

        it('PATCH - /permissionGroup', async (done) => {
            request(app)
                .patch('/permissionGroup')
                .set('Accept', 'application/json')
                .set('userId', 'root-user')
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

        it('DELETE - /permissionGroup', async (done) => {
            request(app)
                .delete('/permissionGroup')
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
    

    
        it('GET - /permissionGroup/:id', async (done) => {
            request(app)
                .get('/permissionGroup/1')
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

        it('PUT - /permissionGroup/:id', async (done) => {
            request(app)
                .put('/permissionGroup/1')
                .set('Accept', 'application/json')
                .set('userId', 'root-user')
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

        it('PATCH - /permissionGroup/:id', async (done) => {
            request(app)
                .patch('/permissionGroup/1')
                .set('Accept', 'application/json')
                .set('userId', 'root-user')
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

        it('DELETE - /permissionGroup/:id', async (done) => {
            request(app)
                .delete('/permissionGroup/1')
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
    