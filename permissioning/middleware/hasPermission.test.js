const dependencyInjector = require('../dependency-injector.js');
const express = require('express');
const request = require('supertest');

const {initializeSqlite} = require('../initialization');

initializeSqlite(':memory:');
dependencyInjector.register('permissionModel', require('../models/permission'));
dependencyInjector.register('groupLevelPermissionModel', require('../models/groupLevelPermission'));
dependencyInjector.register('permissionGroupToUserModel', () => ({}));
dependencyInjector.register('permissionGroupToPermissionModel', () => ({}));

dependencyInjector.register('permissionService', require('../services/permission'));
dependencyInjector.register('groupLevelPermissionService', require('../services/groupLevelPermission'));
dependencyInjector.register('recordLevelPermissionService', () => ({}));
dependencyInjector.register('groupLevelPermissionService', () => ({}));

beforeEach(async () => {
    await new Promise((resolve, reject) => {
        const createPermissionsAndUserQuery = `
        CREATE TABLE permission(id INTEGER PRIMARY KEY, name TEXT UNIQUE, description TEXT);
        INSERT INTO permission VALUES (1, 'TEST_GET', 'PLACEHOLD');
        INSERT INTO permission VALUES (2, 'TEST_POST', 'PLACEHOLD');
        INSERT INTO permission VALUES (3, 'TEST_MODIFY', 'PLACEHOLD');
        INSERT INTO permission VALUES (4, 'TEST_DELETE', 'PLACEHOLD');
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
        });
    });
})

const hasPermission = require('./hasPermission');

function successHandler(req, res, next){
    res.status(200).end();
}
describe('hasPermission middleware tests', () => {
    const app = express();
    app.use(express.json());
    
    app.get(
        '/test',
        hasPermission('TEST_GET'),
        successHandler
    );

    app.post(
        '/test',
        hasPermission('TEST_POST'),
        successHandler
    );

    app.put(
        '/test',
        hasPermission('TEST_MODIFY'),
        successHandler
    );

    app.patch(
        '/test',
        hasPermission('TEST_MODIFY'),
        successHandler
    );

    app.put(
        '/test',
        hasPermission('TEST_DELETE'),
        successHandler
    );
    
    app.use((err, req, res, next) => {
        res.status(403).end();
    })

    it('if user has get permission they get access to route', async (done) => {
        request(app)
            .get('/test')
            .set('Accept', 'application/json')
            .set('userId', 'root-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(() => done());
    });

    it('if user has post permission they get access to route', async (done) => {
        request(app)
            .post('/test')
            .set('Accept', 'application/json')
            .set('userId', 'root-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(() => done());
    });

    it('if user has modify permission they get access to route - put', async (done) => {
        request(app)
            .put('/test')
            .set('Accept', 'application/json')
            .set('userId', 'root-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(() => done());
    });

    it('if user has modify permission they get access to route - patch', async (done) => {
        request(app)
            .patch('/test')
            .set('Accept', 'application/json')
            .set('userId', 'root-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(() => done());
    });

    it('if user has delete permission they get access to route', async (done) => {
        request(app)
            .delete('/test')
            .set('Accept', 'application/json')
            .set('userId', 'root-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(() => done());
    });


    it('if user does not have get permission they dont get access to route', async (done) => {
        request(app)
            .get('/test')
            .set('Accept', 'application/json')
            .set('userId', 'not-root-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(403)
            .end(() => done());
    });

    it('if user does not have post permission they dont get access to route', async (done) => {
        request(app)
            .post('/test')
            .set('Accept', 'application/json')
            .set('userId', 'not-root-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(403)
            .end(() => done());
    });

    it('if user does not have modify permission they dont get access to route - put', async (done) => {
        request(app)
            .put('/test')
            .set('Accept', 'application/json')
            .set('userId', 'not-root-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(403)
            .end(() => done());
    });

    it('if user does not have modify permission they dont get access to route - patch', async (done) => {
        request(app)
            .patch('/test')
            .set('Accept', 'application/json')
            .set('userId', 'not-root-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(403)
            .end(() => done());
    });

    it('if user does not have delete permission they dont get access to route', async (done) => {
        request(app)
            .delete('/test')
            .set('Accept', 'application/json')
            .set('userId', 'not-root-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(403)
            .end(() => done());
    });
})