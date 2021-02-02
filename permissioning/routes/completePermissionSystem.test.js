const { query } = require('express');
const dependencyInjector = require('../dependency-injector')

const {initializeSqlite} = require('../initialization');
initializeSqlite(':memory:');
dependencyInjector.register('recordLevelPermissionModel', require('../models/recordLevelPermission'));
dependencyInjector.register('permissionModel', require('../models/permission'))
dependencyInjector.register('groupLevelPermissionModel', require('../models/groupLevelPermission'))
dependencyInjector.register('recordLevelPermissionService', require('../services/recordLevelPermission'));
dependencyInjector.register('permissionService', require('../services/permission'))
dependencyInjector.register('groupLevelPermissionService', require('../services/groupLevelPermission'))

// a complete test of basic CRUD permissions as well as groupLevelPermissions + recordLevelPermissions
// the basic premise is that there is a web forum that has two groups on it; hunters and gardeners who are always fueding (why they simply don't create seperate websites for themselves is irrelevant)
// Basically, this tests that users in one group cant mess with the other groups records
let initializationQuery = '';
initializationQuery += `
CREATE TABLE permission(id INTEGER PRIMARY KEY, name TEXT UNIQUE, description TEXT);
CREATE TABLE permissionGroup(id INTEGER PRIMARY KEY, name TEXT UNIQUE, description TEXT);
CREATE TABLE permissionGroupToPermission(id INTEGER PRIMARY KEY, groupId INTEGER, permissionId INTEGER);
CREATE TABLE permissionGroupToUser(id INTEGER PRIMARY KEY, userId TEXT, groupId INTEGER);
CREATE TABLE recordLevelPermission(id INTEGER PRIMARY KEY ASC, tableName TEXT, recordId INTEGER, permissionType TEXT, granteeId TEXT, get INTEGER, modify INTEGER, del INTEGER);
CREATE TABLE groupLevelPermission(id INTEGER PRIMARY KEY, tableName TEXT, groupId INTEGER, permissionType TEXT, granteeId TEXT, get INTEGER, post INTEGER);
CREATE TABLE forumPost(id INTEGER PRIMARY KEY, userId TEXT, groupId INTEGER, description TEXT);
 `

//  `
// DROP TABLE permission;
// DROP TABLE permissionGroup;
// DROP TABLE permissionGroupToPermission;
// DROP TABLE permissionGroupToUser;
// DROP TABLE recordLevelPermission;
// DROP TABLE groupLevelPermission;
// DROP TABLE forumPost;
// `

// necessary permissions
initializationQuery += `
INSERT INTO permission VALUES (1, 'FORUM_POST_GET', 'placeholder');
INSERT INTO permission VALUES (2, 'FORUM_POST_POST', 'placeholder');
INSERT INTO permission VALUES (3, 'FORUM_POST_MODIFY', 'placeholder');
INSERT INTO permission VALUES (4, 'FORUM_POST_DELETE', 'placeholder');

INSERT INTO groupLevelPermission VALUES(1, 'forumPost', 4, 'group', '1', 1, 1);
INSERT INTO groupLevelPermission VALUES(2, 'forumPost', 4, 'group', '5', 1, 1);
INSERT INTO groupLevelPermission VALUES(3, 'forumPost', 4, 'group', '6', 1, 1);

INSERT INTO groupLevelPermission VALUES(4, 'forumPost', 7, 'group', '1', 1, 1);
INSERT INTO groupLevelPermission VALUES(5, 'forumPost', 7, 'group', '8', 1, 1);
INSERT INTO groupLevelPermission VALUES(6, 'forumPost', 7, 'group', '9', 1, 1);
`

// Groups that are created
// root
initializationQuery += `
INSERT INTO permissionGroup VALUES(1, 'root', 'placeholder');
INSERT INTO permissionGroupToPermission(groupId, permissionId) VALUES (1, 1);
INSERT INTO permissionGroupToPermission(groupId, permissionId) VALUES (1, 2);
INSERT INTO permissionGroupToPermission(groupId, permissionId) VALUES (1, 3);
INSERT INTO permissionGroupToPermission(groupId, permissionId) VALUES (1, 4);
`
// Forum User - complete CRUD permissions to the forumPost route
initializationQuery += `
INSERT INTO permissionGroup VALUES (2, 'Forum User', 'placeholder');
INSERT INTO permissionGroupToPermission(groupId, permissionId) VALUES (2, 1);
INSERT INTO permissionGroupToPermission(groupId, permissionId) VALUES (2, 2);
INSERT INTO permissionGroupToPermission(groupId, permissionId) VALUES (2, 3);
INSERT INTO permissionGroupToPermission(groupId, permissionId) VALUES (2, 4);
`
// Lurker - R permissions for gardner and hunter records
initializationQuery += `
INSERT INTO permissionGroup VALUES (3, 'Lurker', 'placeholder');
INSERT INTO permissionGroupToPermission(groupId, permissionId) VALUES (3, 1);
`
// Gardener Group
initializationQuery += `
INSERT INTO permissionGroup VALUES (4, 'Gardener Group', 'placeholder');
`
// Gardener Admin - CRD permissions for the gardener-group records
initializationQuery += `
INSERT INTO permissionGroup VALUES (5, 'Gardener Admin', 'placeholder');
`
// Gardener User - CR permissions for the gardener-group records, RUD permissions for own records
initializationQuery += `
INSERT INTO permissionGroup VALUES (6, 'Gardener User', 'placeholder');
`
// Hunter Group
initializationQuery += `
INSERT INTO permissionGroup VALUES (7, 'Hunter Group', 'placeholder');
`
// Hunter Admin - CRD permissions for the hunter-group records
initializationQuery += `
INSERT INTO permissionGroup VALUES (8, 'Hunter Admin', 'placeholder');
`
// Hunter User - CR permissions for the hunter-group records, RUD permissions for own records
initializationQuery += `
INSERT INTO permissionGroup VALUES (9, 'Hunter User', 'placeholder');
`

// Users involved in test
// root-user: member of root group
initializationQuery += `
INSERT INTO permissionGroupToUser(userId, groupId) VALUES ('root-user', 1);
`
// gardener-admin: member of Forum User, Gardener Group, Gardener Admin, Gardener User
initializationQuery += `
INSERT INTO permissionGroupToUser(userId, groupId) VALUES ('gardener-admin', 2);
INSERT INTO permissionGroupToUser(userId, groupId) VALUES ('gardener-admin', 4);
INSERT INTO permissionGroupToUser(userId, groupId) VALUES ('gardener-admin', 5);
INSERT INTO permissionGroupToUser(userId, groupId) VALUES ('gardener-admin', 6);
`
// gardener-user: member of Forum User, Gardener Group, Gardener User
initializationQuery += `
INSERT INTO permissionGroupToUser(userId, groupId) VALUES ('gardener-user', 2);
INSERT INTO permissionGroupToUser(userId, groupId) VALUES ('gardener-user', 4);
INSERT INTO permissionGroupToUser(userId, groupId) VALUES ('gardener-user', 6);
`
// hunter-admin: member of Forum User, Hunter Group, Hunter Admin, Hunter User
initializationQuery += `
INSERT INTO permissionGroupToUser(userId, groupId) VALUES ('hunter-admin', 2);
INSERT INTO permissionGroupToUser(userId, groupId) VALUES ('hunter-admin', 7);
INSERT INTO permissionGroupToUser(userId, groupId) VALUES ('hunter-admin', 8);
INSERT INTO permissionGroupToUser(userId, groupId) VALUES ('hunter-admin', 9);
`
// hunter-user: member of Forum User, Hunter Group, Hunter User
initializationQuery += `
INSERT INTO permissionGroupToUser(userId, groupId) VALUES ('hunter-user', 2);
INSERT INTO permissionGroupToUser(userId, groupId) VALUES ('hunter-user', 7);
INSERT INTO permissionGroupToUser(userId, groupId) VALUES ('hunter-user', 9);
`
// lurker-user: member of lurker group
initializationQuery += `
INSERT INTO permissionGroupToUser(userId, groupId) VALUES ('lurker-user', 3);
INSERT INTO permissionGroupToUser(userId, groupId) VALUES ('lurker-user', 4);
INSERT INTO permissionGroupToUser(userId, groupId) VALUES ('lurker-user', 7);
`

// Forum Posts that are created by default
// In Gardener group: 1 by root user, 1 by gardener-admin, 1 by gardener-user
initializationQuery += `
INSERT INTO forumPost(userId, groupId, description) VALUES ('root-user', 4, 'This is a post created by root-user');
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 1, 'user', 'root-user', 1, 1, 1);
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 1, 'group', 1, 1, 1, 1);
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 1, 'group', 4, 1, 0, 0);
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 1, 'group', 5, 1, 0, 1);

INSERT INTO forumPost(userId, groupId, description) VALUES ('gardener-admin', 4, 'This is a post created by gardener-admin');
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 2, 'user', 'gardener-admin', 1, 1, 1);
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 2, 'group', 1, 1, 1, 1);
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 2, 'group', 4, 1, 0, 0);
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 2, 'group', 5, 1, 0, 1);

INSERT INTO forumPost(userId, groupId, description) VALUES ('gardener-user', 4, 'This is a post created by gardener-user');
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 3, 'user', 'gardener-user', 1, 1, 1);
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 3, 'group', 1, 1, 1, 1);
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 3, 'group', 4, 1, 0, 0);
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 3, 'group', 5, 1, 0, 1);
`
// In Hunter group: 1 by root user, 1 by hunter-admin, 1 by hunter-user
initializationQuery += `
INSERT INTO forumPost(userId, groupId, description) VALUES ('root-user', 7, 'This is a post created by root-user');
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 4, 'user', 'root-user', 1, 1, 1);
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 4, 'group', 1, 1, 1, 1);
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 4, 'group', 7, 1, 0, 0);
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 4, 'group', 8, 1, 0, 1);

INSERT INTO forumPost(userId, groupId, description) VALUES ('hunter-admin', 7, 'This is a post created by hunter-admin');
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 5, 'user', 'hunter-admin', 1, 1, 1);
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 5, 'group', 1, 1, 1, 1);
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 5, 'group', 7, 1, 0, 0);
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 5, 'group', 8, 1, 0, 1);

INSERT INTO forumPost(userId, groupId, description) VALUES ('hunter-user', 7, 'This is a post created by hunter-user');
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 6, 'user', 'hunter-user', 1, 1, 1);
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 6, 'group', 1, 1, 1, 1);
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 6, 'group', 7, 1, 0, 0);
INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES ('forumPost', 6, 'group', 8, 1, 0, 1);

`


// testing flows
beforeAll(async () => {
    await new Promise((resolve, reject) => dependencyInjector
        .dependencies
        .sqlite
        .exec(initializationQuery, (err) => {
            if(err) reject(err);
            else resolve();
        })
    )

})

afterAll(async () => {
    await new Promise((resolve, reject) => dependencyInjector
        .dependencies
        .sqlite
        .exec(`
        DROP TABLE permission;
        DROP TABLE permissionGroup;
        DROP TABLE permissionGroupToPermission;
        DROP TABLE permissionGroupToUser;
        DROP TABLE recordLevelPermission;
        DROP TABLE groupLevelPermission;
        DROP TABLE forumPost;
        `, (err) => {
            if(err) reject(err);
            else resolve();
        })
    )
});
describe('complete permission system test', () => {
    
    const recordLevelPermissionModel = dependencyInjector.inject('recordLevelPermissionModel');

    const {hasPermission, hasRecordLevelPermission, hasRecordLevelPermissionBulk, hasGroupLevelPermission} = require('../middleware/middleware');
    
    const request = require('supertest');
    const express = require('express');
    const app = express();
    
    app.use(express.json());
    
    app.get(
        '/forumPost', 
        hasPermission('FORUM_POST_GET'), 
        async (req, res) => {
            const {query, escapedQueryValues} = recordLevelPermissionModel.addRecordLevelPermissionCheckToBulkGet('forumPost', 'forumPost', req.headers.userid);
            const results = await new Promise((resolve, reject) => {
                dependencyInjector
                    .dependencies
                    .sqlite
                    .all(
                        `SELECT * FROM forumPost WHERE ${query}`,
                        escapedQueryValues,
                        (err, values) => {
                            err ? reject(err): resolve(values);
                        }
                    );
            })
            res.status(200).json(results);
        }
    );
    app.get(
        '/forumPost/:id', 
        hasPermission('FORUM_POST_GET'),
        hasRecordLevelPermission('forumPost', 'get'), 
        (req, res) => res.status(200).json({})
    );
    
    app.post(
        '/forumPost', 
        hasPermission('FORUM_POST_POST'), 
        hasGroupLevelPermission('forumPost', 'post'),
        (req, res) => res.status(200).json({})
    );
    
    app.patch(
        '/forumPost', 
        hasPermission('FORUM_POST_MODIFY'),
        hasRecordLevelPermissionBulk('forumPost', 'modify'), 
        (req, res) => res.status(200).json({})
    );
    
    app.patch(
        '/forumPost/:id', 
        hasPermission('FORUM_POST_MODIFY'),
        hasRecordLevelPermission('forumPost', 'modify'), 
        (req, res) => res.status(200).json({})
    );
    
    app.delete(
        '/forumPost', 
        hasPermission('FORUM_POST_DELETE'),
        hasRecordLevelPermissionBulk('forumPost', 'del'), 
        (req, res) => res.status(200).json({})
    );
    
    app.delete(
        '/forumPost/:id', 
        hasPermission('FORUM_POST_DELETE'),
        hasRecordLevelPermission('forumPost', 'del'), 
        (req, res) => res.status(200).json({})
    );
    
    
    app.use((err, req, res, next) => {
        res.status(500).json({});
    })

    // GET
    // get all on forumPost: root and lurker get 6 records returned, gardener-admin and gardener-user get the 3 gardener records, hunter-admin and hunter-user get the 3 hunter records
    it('root-user gets six records returned', async (done) => {
        request(app)
            .get('/forumPost')
            .set('Accept', 'application/json')
            .set('userId', 'root-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.length).toBe(6);
                done();
            });
    })

    it('lurker-user gets six records returned', async (done) => {
        request(app)
            .get('/forumPost')
            .set('Accept', 'application/json')
            .set('userId', 'lurker-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                console.log(res.body)
                expect(res.body.length).toBe(6);
                done();
            });
    })

    it('gardener-admin gets three records returned', async (done) => {
        request(app)
            .get('/forumPost')
            .set('Accept', 'application/json')
            .set('userId', 'gardener-admin')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.length).toBe(3);
                done();
            });
    })

    it('gardener-user gets three records returned', async (done) => {
        request(app)
            .get('/forumPost')
            .set('Accept', 'application/json')
            .set('userId', 'gardener-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.length).toBe(3);
                done();
            });
    })

    it('hunter-admin gets three records returned', async (done) => {
        request(app)
            .get('/forumPost')
            .set('Accept', 'application/json')
            .set('userId', 'hunter-admin')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.length).toBe(3);
                done();
            });
    });

    it('hunter-user gets three records returned', async (done) => {
        request(app)
            .get('/forumPost')
            .set('Accept', 'application/json')
            .set('userId', 'hunter-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.length).toBe(3);
                done();
            });
    })
    // get specific gardener group record: root, lurker, gardener-admin, and gardener-user can successfully get, hunter-admin and hunter-user cannot
    it('root-user can get specific gardener group record', async (done) => {
        request(app)
            .get('/forumPost/1')
            .set('Accept', 'application/json')
            .set('userId', 'root-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
    it('lurker-user can get specific gardener group record', async (done) => {
        request(app)
            .get('/forumPost/1')
            .set('Accept', 'application/json')
            .set('userId', 'lurker-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
    it('gardener-admin can get specific gardener group record', async (done) => {
        request(app)
            .get('/forumPost/1')
            .set('Accept', 'application/json')
            .set('userId', 'gardener-admin')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
    it('gardener-user can get specific gardener group record', async (done) => {
        request(app)
            .get('/forumPost/1')
            .set('Accept', 'application/json')
            .set('userId', 'gardener-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
    it('hunter-admin cant get specific gardener group record', async (done) => {
        request(app)
            .get('/forumPost/1')
            .set('Accept', 'application/json')
            .set('userId', 'hunter-admin')
            .send({})
            .expect('Content-Type', /json/)
            .expect(500, done)
    })
    it('hunter-user cant get specific gardener group record', async (done) => {
        request(app)
            .get('/forumPost/1')
            .set('Accept', 'application/json')
            .set('userId', 'hunter-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(500, done)
    })
    // get specific hunter group record: root, lurker, hunter-admin, and hunter-user can successfully get, gardener-admin and gardener-user cannot
    it('root-user can get specific hunter group record', async (done) => {
        request(app)
            .get('/forumPost/4')
            .set('Accept', 'application/json')
            .set('userId', 'root-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
    it('lurker-user can get specific hunter group record', async (done) => {
        request(app)
            .get('/forumPost/4')
            .set('Accept', 'application/json')
            .set('userId', 'lurker-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
    it('gardener-admin cant get specific hunter group record', async (done) => {
        request(app)
            .get('/forumPost/4')
            .set('Accept', 'application/json')
            .set('userId', 'gardener-admin')
            .send({})
            .expect('Content-Type', /json/)
            .expect(500, done)
    })
    it('gardener-user cant get specific hunter group record', async (done) => {
        request(app)
            .get('/forumPost/4')
            .set('Accept', 'application/json')
            .set('userId', 'gardener-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(500, done)
    })
    it('hunter-admin can get specific hunter group record', async (done) => {
        request(app)
            .get('/forumPost/4')
            .set('Accept', 'application/json')
            .set('userId', 'hunter-admin')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
    it('hunter-user can get specific hunter group record', async (done) => {
        request(app)
            .get('/forumPost/4')
            .set('Accept', 'application/json')
            .set('userId', 'hunter-user')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200, done)
    })

    // POST
    // gardenerGroup: root, gardener-admin, gardener-user can post successfully, hunter-admin, hunter-user, and lurker cannot
    it('root-user can post to garden group', async (done) => {
        request(app)
            .post('/forumPost')
            .set('Accept', 'application/json')
            .set('userId', 'root-user')
            .send({groupId: 4})
            .expect('Content-Type', /json/)
            .expect(200, done)
    });

    it('lurker-user cant post to garden group', async (done) => {
        request(app)
            .post('/forumPost')
            .set('Accept', 'application/json')
            .set('userId', 'lurker-user')
            .send({groupId: 4})
            .expect('Content-Type', /json/)
            .expect(500, done)
    });

    it('gardener-admin can post to garden group', async (done) => {
        request(app)
            .post('/forumPost')
            .set('Accept', 'application/json')
            .set('userId', 'gardener-admin')
            .send({groupId: 4})
            .expect('Content-Type', /json/)
            .expect(200, done)
    });

    it('gardener-user can post to garden group', async (done) => {
        request(app)
            .post('/forumPost')
            .set('Accept', 'application/json')
            .set('userId', 'gardener-user')
            .send({groupId: 4})
            .expect('Content-Type', /json/)
            .expect(200, done)
    });

    it('hunter-admin cant post to garden group', async (done) => {
        request(app)
            .post('/forumPost')
            .set('Accept', 'application/json')
            .set('userId', 'hunter-admin')
            .send({groupId: 4})
            .expect('Content-Type', /json/)
            .expect(500, done)
    });

    it('hunter-user cant post to garden group', async (done) => {
        request(app)
            .post('/forumPost')
            .set('Accept', 'application/json')
            .set('userId', 'hunter-user')
            .send({groupId: 4})
            .expect('Content-Type', /json/)
            .expect(500, done)
    });

    // hunterGroup: root, hunter-admin, hunter-user can post successfully, gardener-admin, gardener-user, and lurker cannot
    it('root-user can post to garden group', async (done) => {
        request(app)
            .post('/forumPost')
            .set('Accept', 'application/json')
            .set('userId', 'root-user')
            .send({groupId: 4})
            .expect('Content-Type', /json/)
            .expect(200, done)
    });

    it('lurker-user cant post to garden group', async (done) => {
        request(app)
            .post('/forumPost')
            .set('Accept', 'application/json')
            .set('userId', 'lurker-user')
            .send({groupId: 4})
            .expect('Content-Type', /json/)
            .expect(500, done)
    });

    it('gardener-admin can post to garden group', async (done) => {
        request(app)
            .post('/forumPost')
            .set('Accept', 'application/json')
            .set('userId', 'gardener-admin')
            .send({groupId: 4})
            .expect('Content-Type', /json/)
            .expect(200, done)
    });

    it('gardener-user can post to garden group', async (done) => {
        request(app)
            .post('/forumPost')
            .set('Accept', 'application/json')
            .set('userId', 'gardener-user')
            .send({groupId: 4})
            .expect('Content-Type', /json/)
            .expect(200, done)
    });

    it('hunter-admin cant post to garden group', async (done) => {
        request(app)
            .post('/forumPost')
            .set('Accept', 'application/json')
            .set('userId', 'hunter-admin')
            .send({groupId: 4})
            .expect('Content-Type', /json/)
            .expect(500, done)
    });

    it('hunter-user cant post to garden group', async (done) => {
        request(app)
            .post('/forumPost')
            .set('Accept', 'application/json')
            .set('userId', 'hunter-user')
            .send({groupId: 4})
            .expect('Content-Type', /json/)
            .expect(500, done)
    });

    // PATCH - doing PUT and PATCH seemed redundant

    it('root-user can patch every record', async (done) => {
        const postIds = [1, 2, 3, 4, 5, 6];
        await Promise.all(
            postIds.map(id => new Promise((resolve, reject) => {
                request(app)
                    .patch(`/forumPost/${id}`)
                    .set('Accept', 'application/json')
                    .set('userId', 'root-user')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err) => err ? reject(err): resolve())
            }))
        );
        done();
    })

    it('lurker-user cant patch any record', async (done) => {
        const postIds = [1, 2, 3, 4, 5, 6];
        await Promise.all(
            postIds.map(id => new Promise((resolve, reject) => {
                request(app)
                    .patch(`/forumPost/${id}`)
                    .set('Accept', 'application/json')
                    .set('userId', 'lurker-user')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(500)
                    .end((err) =>err ? reject(err): resolve())
            }))
        );
        done();
    })

    it('gardener-admin can patch records that are his', async (done) => {
        const postIds = [2];
        await Promise.all(
            postIds.map(id => new Promise((resolve, reject) => {
                request(app)
                    .patch(`/forumPost/${id}`)
                    .set('Accept', 'application/json')
                    .set('userId', 'gardener-admin')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err) =>err ? reject(err): resolve())
            }))
        );
        done();
    })
    it('gardener-admin cant patch records that arent his', async (done) => {
        const postIds = [1, 3, 4, 5, 6];
        await Promise.all(
            postIds.map(id => new Promise((resolve, reject) => {
                request(app)
                    .patch(`/forumPost/${id}`)
                    .set('Accept', 'application/json')
                    .set('userId', 'gardener-admin')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(500)
                    .end((err) =>err ? reject(err): resolve())
            }))
        );
        done();
    })

    it('gardener-user can patch records that are his', async (done) => {
        const postIds = [3];
        await Promise.all(
            postIds.map(id => new Promise((resolve, reject) => {
                request(app)
                    .patch(`/forumPost/${id}`)
                    .set('Accept', 'application/json')
                    .set('userId', 'gardener-user')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err) =>err ? reject(err): resolve())
            }))
        );
        done();
    })
    it('gardener-user cant patch records that arent his', async (done) => {
        const postIds = [1, 2, 4, 5, 6];
        await Promise.all(
            postIds.map(id => new Promise((resolve, reject) => {
                request(app)
                    .patch(`/forumPost/${id}`)
                    .set('Accept', 'application/json')
                    .set('userId', 'gardener-user')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(500)
                    .end((err) =>err ? reject(err): resolve())
            }))
        );
        done();
    })

    it('hunter-admin can patch records that are his', async (done) => {
        const postIds = [5];
        await Promise.all(
            postIds.map(id => new Promise((resolve, reject) => {
                request(app)
                    .patch(`/forumPost/${id}`)
                    .set('Accept', 'application/json')
                    .set('userId', 'hunter-admin')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err) =>err ? reject(err): resolve())
            }))
        );
        done();
    })
    it('hunter-admin cant patch records that arent his', async (done) => {
        const postIds = [1, 2, 3, 4, 6];
        await Promise.all(
            postIds.map(id => new Promise((resolve, reject) => {
                request(app)
                    .patch(`/forumPost/${id}`)
                    .set('Accept', 'application/json')
                    .set('userId', 'hunter-admin')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(500)
                    .end((err) =>err ? reject(err): resolve())
            }))
        );
        done();
    })

    it('hunter-user can patch records that are his', async (done) => {
        const gardenerPostIds = [6];
        await Promise.all(
            gardenerPostIds.map(id => new Promise((resolve, reject) => {
                request(app)
                    .patch(`/forumPost/${id}`)
                    .set('Accept', 'application/json')
                    .set('userId', 'hunter-user')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err) =>err ? reject(err): resolve())
            }))
        );
        done();
    })
    it('hunter-user cant patch records that arent his', async (done) => {
        const gardenerPostIds = [1, 2, 3, 4, 5];
        await Promise.all(
            gardenerPostIds.map(id => new Promise((resolve, reject) => {
                request(app)
                    .patch(`/forumPost/${id}`)
                    .set('Accept', 'application/json')
                    .set('userId', 'hunter-user')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(500)
                    .end((err) =>err ? reject(err): resolve())
            }))
        );
        done();
    })

    // DELETE

    it('root-user can delete every record', async (done) => {
        const postIds = [1, 2, 3, 4, 5, 6];
        await Promise.all(
            postIds.map(id => new Promise((resolve, reject) => {
                request(app)
                    .delete(`/forumPost/${id}`)
                    .set('Accept', 'application/json')
                    .set('userId', 'root-user')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err) =>err ? reject(err): resolve())
            }))
        );
        done();
    })

    it('lurker-user cant delete any record', async (done) => {
        const postIds = [1, 2, 3, 4, 5, 6];
        await Promise.all(
            postIds.map(id => new Promise((resolve, reject) => {
                request(app)
                    .delete(`/forumPost/${id}`)
                    .set('Accept', 'application/json')
                    .set('userId', 'lurker-user')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(500)
                    .end((err) =>err ? reject(err): resolve())
            }))
        );
        done();
    })

    it('gardener-admin can delete every garden group record', async (done) => {
        const postIds = [1, 2, 3];
        await Promise.all(
            postIds.map(id => new Promise((resolve, reject) => {
                request(app)
                    .delete(`/forumPost/${id}`)
                    .set('Accept', 'application/json')
                    .set('userId', 'gardener-admin')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err) =>err ? reject(err): resolve())
            }))
        );
        done();
    })

    it('gardener-admin cant delete non garden group records', async (done) => {
        const postIds = [4, 5, 6];
        await Promise.all(
            postIds.map(id => new Promise((resolve, reject) => {
                request(app)
                    .delete(`/forumPost/${id}`)
                    .set('Accept', 'application/json')
                    .set('userId', 'gardener-admin')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(500)
                    .end((err) =>err ? reject(err): resolve())
            }))
        );
        done();
    })

    it('gardener-user can delete own records', async (done) => {
        const postIds = [3];
        await Promise.all(
            postIds.map(id => new Promise((resolve, reject) => {
                request(app)
                    .delete(`/forumPost/${id}`)
                    .set('Accept', 'application/json')
                    .set('userId', 'gardener-user')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err) =>err ? reject(err): resolve())
            }))
        );
        done();
    })

    it('gardener-user cant delete records that arent his', async (done) => {
        const postIds = [1, 2, 4, 5, 6];
        await Promise.all(
            postIds.map(id => new Promise((resolve, reject) => {
                request(app)
                    .delete(`/forumPost/${id}`)
                    .set('Accept', 'application/json')
                    .set('userId', 'gardener-user')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(500)
                    .end((err) =>err ? reject(err): resolve())
            }))
        );
        done();
    })

    it('hunter-admin can delete every garden group record', async (done) => {
        const postIds = [4, 5, 6];
        await Promise.all(
            postIds.map(id => new Promise((resolve, reject) => {
                request(app)
                    .delete(`/forumPost/${id}`)
                    .set('Accept', 'application/json')
                    .set('userId', 'hunter-admin')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err) =>err ? reject(err): resolve())
            }))
        );
        done();
    })

    it('hunter-admin cant delete non garden group records', async (done) => {
        const postIds = [1, 2, 3];
        await Promise.all(
            postIds.map(id => new Promise((resolve, reject) => {
                request(app)
                    .delete(`/forumPost/${id}`)
                    .set('Accept', 'application/json')
                    .set('userId', 'hunter-admin')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(500)
                    .end((err) =>err ? reject(err): resolve())
            }))
        );
        done();
    })

    it('hunter-user can delete own records', async (done) => {
        const postIds = [6];
        await Promise.all(
            postIds.map(id => new Promise((resolve, reject) => {
                request(app)
                    .delete(`/forumPost/${id}`)
                    .set('Accept', 'application/json')
                    .set('userId', 'hunter-user')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err) =>err ? reject(err): resolve())
            }))
        );
        done();
    })

    it('hunter-user cant delete records that arent his', async (done) => {
        const postIds = [1, 2, 3, 4, 5];
        await Promise.all(
            postIds.map(id => new Promise((resolve, reject) => {
                request(app)
                    .delete(`/forumPost/${id}`)
                    .set('Accept', 'application/json')
                    .set('userId', 'hunter-user')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(500)
                    .end((err) =>err ? reject(err): resolve())
            }))
        );
        done();
    })

})