
    const dependencyInjector = require('../dependency-injector.js');

    dependencyInjector.register('recordLevelPermissionService', () => ({}));
    dependencyInjector.register('permissionGroupToUserModel', () => ({}));
    dependencyInjector.register('permissionGroupToPermissionModel', () => ({}));
    dependencyInjector.register('permissionModel', () => ({}));
    dependencyInjector.register('groupLevelPermissionService', () => ({}));
    
    const {initializeSqlite} = require('../initialization');
    initializeSqlite(':memory:');
    const groupLevelPermissionModels = require('./groupLevelPermission');
    
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
        });

        
        await new Promise((resolve, reject) => {
            const groupLevelPermissionQuery = `
            CREATE TABLE groupLevelPermission(id INTEGER PRIMARY KEY ASC, tableName TEXT, groupId INTEGER, permissionType TEXT, granteeId TEXT, get INTEGER, post INTEGER);
            INSERT INTO groupLevelPermission(tableName, groupId, permissionType, granteeId, get, post) VALUES("exampleTable", 1, "group", "1", 1, 1);
            INSERT INTO groupLevelPermission(tableName, groupId, permissionType, granteeId, get, post) VALUES("anotherExampleTable", 1, "user", "root-user", 1, 1);
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
            dependencyInjector.dependencies.sqlite.exec(`
            DROP TABLE groupLevelPermission;
            DROP TABLE permission;
            DROP TABLE permissionGroup;
            DROP TABLE permissionGroupToPermission;
            DROP TABLE permissionGroupToUser;
            `, (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            });
        })
    })

    describe('groupLevelPermission model tests ', () => {
        it('getGroupLevelPermission should return two records', async (done) => {
            let records = await groupLevelPermissionModels.getGroupLevelPermissions({limit:10, offset: 0}, 'id,tableName,groupId,permissionType,granteeId,get,post');
            expect(records.length).toBe(2);

            done();
        });

        it('getSpecificGroupLevelPermission should return a singular record', async (done) => {
            let record = await groupLevelPermissionModels.getSpecificGroupLevelPermission(1, 'id,tableName,groupId,permissionType,granteeId,get,post');
            expect(record).toBeTruthy();
            expect(record.id).toBeTruthy();

            done();
        });

        it('postGroupLevelPermission should return an object with an id', async (done) => {
            let result = await groupLevelPermissionModels.postGroupLevelPermission({"tableName":"string","groupId":0,"permissionType":"string","granteeId":"string","get":0,"post":0});
            expect(result).toBeTruthy();
            expect(result.id).toBeTruthy();

            done();
        });

        it('updateGroupLevelPermissions should update records', async (done) => {
            let result = await groupLevelPermissionModels.updateGroupLevelPermissions([{"id":1,"tableName":"string","groupId":0,"permissionType":"string","granteeId":"string","get":0,"post":0}]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM groupLevelPermission WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"tableName":"stringa","groupId":1,"permissionType":"stringa","granteeId":"stringa","get":1,"post":1});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })

        });

        it('updateSpecificGroupLevelPermission should update a specific record', async (done) => {
            let result = await groupLevelPermissionModels.updateSpecificGroupLevelPermission({"id":2,"tableName":"stringa","groupId":1,"permissionType":"stringa","granteeId":"stringa","get":1,"post":1});
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM groupLevelPermission WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"tableName":"stringa","groupId":1,"permissionType":"stringa","granteeId":"stringa","get":1,"post":1});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })
        });

        it('patchGroupLevelPermissions should update records', async (done) => {
            let result = await groupLevelPermissionModels.patchGroupLevelPermissions([{"id":1,"tableName":"string","groupId":0,"permissionType":"string","granteeId":"string","get":0,"post":0}]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM groupLevelPermission WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"tableName":"stringa","groupId":1,"permissionType":"stringa","granteeId":"stringa","get":1,"post":1});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })

        });

        it('patchSpecificGroupLevelPermission should update a specific record', async (done) => {
            let result = await groupLevelPermissionModels.patchSpecificGroupLevelPermission(1, {"tableName":"string","groupId":0,"permissionType":"string","granteeId":"string","get":0,"post":0});
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM groupLevelPermission WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"tableName":"string","groupId":0,"permissionType":"string","granteeId":"string","get":0,"post":0});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })
        });

        it('deleteGroupLevelPermissions should delete records', async (done) => {
            let result = await groupLevelPermissionModels.deleteGroupLevelPermissions([1, 2]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.all('SELECT * FROM groupLevelPermission', (err, result) => {
                expect(result.length).toBe(0);
                done();
            })
        });

        it('deleteSpecificGroupLevelPermission should delete a specific record', async (done) => {
            let result = await groupLevelPermissionModels.deleteSpecificGroupLevelPermission(1);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.all('SELECT * FROM groupLevelPermission', (err, result) => {
                expect(result.length).toBe(1);
                done();
            })
        });

        it('runGroupLevelPermissionQuery should return true for a user that does have permission to post to a group', async (done) => {
            // userId, groupId, tableName, operation
            let result = await groupLevelPermissionModels.runGroupLevelPermissionQuery('root-user', 1, 'exampleTable', 'post');
            expect(result).toBeTruthy();

            let resultTwo = await groupLevelPermissionModels.runGroupLevelPermissionQuery('root-user', 1, 'anotherExampleTable', 'post');
            expect(resultTwo).toBeTruthy();

            done();
        });

        it('runGroupLevelPermissionQuery should return false for a users that dont have permission to post to a group', async (done) => {
            // userId, groupId, tableName, operation
            let result = await groupLevelPermissionModels.runGroupLevelPermissionQuery('userWithoutPermission', 1, 'exampleTable', 'post');
            expect(result).toBeFalsy();

            let resultTwo = await groupLevelPermissionModels.runGroupLevelPermissionQuery('root-user', 1, 'tableWithoutPermission', 'post');
            expect(resultTwo).toBeFalsy();
            done();
        });

    });
    