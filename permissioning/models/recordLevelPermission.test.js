
    const dependencyInjector = require('../dependency-injector.js');

    dependencyInjector.register('recordLevelPermissionService', () => ({}));
    dependencyInjector.register('permissionGroupToUserModel', () => ({}));
    dependencyInjector.register('permissionGroupToPermissionModel', () => ({}));
    dependencyInjector.register('permissionModel', () => ({}));
    dependencyInjector.register('groupLevelPermissionService', () => ({}));
    
    const {initializeSqlite} = require('../initialization');
    initializeSqlite(':memory:');
    const recordLevelPermissionModels = require('./recordLevelPermission');
    
    beforeEach(async () => {
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
                    console.error(err)
                    reject(err);
                }
                else{
                    resolve(true);
                }
            })
        });
        
        await new Promise((resolve, reject) => {
            const recordLevelPermissionQuery = `
            CREATE TABLE recordLevelPermission(id INTEGER PRIMARY KEY ASC, tableName TEXT, recordId INTEGER, permissionType TEXT, granteeId TEXT, get INTEGER, modify INTEGER, del INTEGER);
            INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES("placeholder for regular tests", 0, "string", "0", 0, 0, 0);
            INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES("placeholder for regular tests", 0, "string", "0", 0, 0, 0);
            INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES("exampleTable", 1, "group", "1", 1, 1, 1);
            INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES("exampleTable", 2, "group", "1", 1, 1, 0);
            INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES("exampleTable", 3, "group", "1", 1, 0, 0);


            INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES("anotherExampleTable", 4, "user", "root-user", 1, 1, 1);
            INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES("anotherExampleTable", 5, "user", "root-user", 1, 1, 0);
            INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, modify, del) VALUES("anotherExampleTable", 6, "user", "root-user", 1, 0, 0);
            `;
            dependencyInjector.dependencies.sqlite.exec(recordLevelPermissionQuery, (err) => {
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
            dependencyInjector.dependencies.sqlite.exec(`
            DROP TABLE permission;
            DROP TABLE permissionGroup;
            DROP TABLE permissionGroupToPermission;
            DROP TABLE permissionGroupToUser;
            DROP TABLE recordLevelPermission;
            `, (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            });
        });
    })

    describe('recordLevelPermission model tests ', () => {
        it('getRecordLevelPermission should return two records', async (done) => {
            let records = await recordLevelPermissionModels.getRecordLevelPermissions({limit:2, offset: 0}, 'id,tableName,recordId,permissionType,granteeId,get,modify,del');
            expect(records.length).toBe(2);

            done();
        });

        it('getSpecificRecordLevelPermission should return a singular record', async (done) => {
            let record = await recordLevelPermissionModels.getSpecificRecordLevelPermission(1, 'id,tableName,recordId,permissionType,granteeId,get,modify,del');
            expect(record).toBeTruthy();
            expect(record.id).toBeTruthy();

            done();
        });

        it('postRecordLevelPermission should return an object with an id', async (done) => {
            let result = await recordLevelPermissionModels.postRecordLevelPermission({"tableName":"string","recordId":0,"permissionType":"string","granteeId":"string","get":0,"modify":0,"del":0});
            expect(result).toBeTruthy();
            expect(result.id).toBeTruthy();

            done();
        });

        it('updateRecordLevelPermissions should update records', async (done) => {
            let result = await recordLevelPermissionModels.updateRecordLevelPermissions([{"id":1,"tableName":"string","recordId":0,"permissionType":"string","granteeId":"string","get":0,"modify":0,"del":0}]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM recordLevelPermission WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"tableName":"stringa","recordId":1,"permissionType":"stringa","granteeId":"stringa","get":1,"modify":1,"del":1});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })

        });

        it('updateSpecificRecordLevelPermission should update a specific record', async (done) => {
            let result = await recordLevelPermissionModels.updateSpecificRecordLevelPermission({"id":2,"tableName":"stringa","recordId":1,"permissionType":"stringa","granteeId":"stringa","get":1,"modify":1,"del":1});
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM recordLevelPermission WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"tableName":"stringa","recordId":1,"permissionType":"stringa","granteeId":"stringa","get":1,"modify":1,"del":1});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })
        });

        it('patchRecordLevelPermissions should update records', async (done) => {
            let result = await recordLevelPermissionModels.patchRecordLevelPermissions([{"id":1,"tableName":"string","recordId":0,"permissionType":"string","granteeId":"string","get":0,"modify":0,"del":0}]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM recordLevelPermission WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"tableName":"stringa","recordId":1,"permissionType":"stringa","granteeId":"stringa","get":1,"modify":1,"del":1});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })

        });

        it('patchSpecificRecordLevelPermission should update a specific record', async (done) => {
            let result = await recordLevelPermissionModels.patchSpecificRecordLevelPermission(1, {"tableName":"string","recordId":0,"permissionType":"string","granteeId":"string","get":0,"modify":0,"del":0});
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM recordLevelPermission WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"tableName":"string","recordId":0,"permissionType":"string","granteeId":"string","get":0,"modify":0,"del":0});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })
        });

        it('deleteRecordLevelPermissions should delete records', async (done) => {
            let result = await recordLevelPermissionModels.deleteRecordLevelPermissions([1, 2, 3, 4, 5, 6, 7, 8]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.all('SELECT * FROM recordLevelPermission', (err, result) => {
                expect(result.length).toBe(0);
                done();
            })
        });

        it('deleteSpecificRecordLevelPermission should delete a specific record', async (done) => {
            let result = await recordLevelPermissionModels.deleteSpecificRecordLevelPermission(1);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.all('SELECT * FROM recordLevelPermission', (err, result) => {
                if(err){
                    console.error(err);
                }
                expect(result.length).toBe(7);
                done();
            })
        });

        it('runRecordLevelPermissionQuery should return true for a user that does have permission to get a record', async (done) => {
            const results = await Promise.all([
                recordLevelPermissionModels.runRecordLevelPermissionQuery('root-user', 1, 'exampleTable', 'get'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('root-user', 2, 'exampleTable', 'get'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('root-user', 3, 'exampleTable', 'get'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('root-user', 4, 'anotherExampleTable', 'get'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('root-user', 5, 'anotherExampleTable', 'get'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('root-user', 6, 'anotherExampleTable', 'get')
            ])
            expect(results.every(truthy => truthy)).toBeTruthy();

            done();
        });

        it('runRecordLevelPermissionQuery should return true for a user that does have permission to modify a record', async (done) => {
            const results = await Promise.all([
                recordLevelPermissionModels.runRecordLevelPermissionQuery('root-user', 1, 'exampleTable', 'modify'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('root-user', 2, 'exampleTable', 'modify'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('root-user', 4, 'anotherExampleTable', 'modify'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('root-user', 5, 'anotherExampleTable', 'modify'),
            ])

            expect(results.every(truthy => truthy)).toBeTruthy();

            done();
        });

        it('runRecordLevelPermissionQuery should return true for a user that does have permission to delete a record', async (done) => {
            const results = await Promise.all([
                recordLevelPermissionModels.runRecordLevelPermissionQuery('root-user', 1, 'exampleTable', 'del'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('root-user', 4, 'anotherExampleTable', 'del')
            ])

            expect(results.every(truthy => truthy)).toBeTruthy();

            done();
        });

        it('runRecordLevelPermissionQuery should return false for a user that doesnt have permission to get a record', async (done) => {
            const results = await Promise.all([
                recordLevelPermissionModels.runRecordLevelPermissionQuery('not-root-user', 1, 'exampleTable', 'get'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('not-root-user', 2, 'exampleTable', 'get'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('not-root-user', 3, 'exampleTable', 'get'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('not-root-user', 4, 'anotherExampleTable', 'get'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('not-root-user', 5, 'anotherExampleTable', 'get'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('not-root-user', 6, 'anotherExampleTable', 'get')
            ])

            expect(results.every(falsy => !falsy)).toBeTruthy();

            done();
        });

        it('runRecordLevelPermissionQuery should return false for a user that doesnt have permission to modify a record', async (done) => {
            const results = await Promise.all([
                recordLevelPermissionModels.runRecordLevelPermissionQuery('not-root-user', 1, 'exampleTable', 'modify'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('not-root-user', 2, 'exampleTable', 'modify'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('not-root-user', 3, 'exampleTable', 'modify'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('not-root-user', 4, 'anotherExampleTable', 'modify'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('not-root-user', 5, 'anotherExampleTable', 'modify'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('not-root-user', 6, 'anotherExampleTable', 'modify'),

                recordLevelPermissionModels.runRecordLevelPermissionQuery('root-user', 3, 'exampleTable', 'modify'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('root-user', 6, 'anotherExampleTable', 'modify')
            ])

            expect(results.every(falsy => !falsy)).toBeTruthy();

            done();
        });

        it('runRecordLevelPermissionQuery should return false for a user that doesnt have permission to delete a record', async (done) => {
            const results = await Promise.all([
                recordLevelPermissionModels.runRecordLevelPermissionQuery('not-root-user', 1, 'exampleTable', 'del'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('not-root-user', 2, 'exampleTable', 'del'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('not-root-user', 3, 'exampleTable', 'del'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('not-root-user', 4, 'anotherExampleTable', 'del'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('not-root-user', 5, 'anotherExampleTable', 'del'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('not-root-user', 6, 'anotherExampleTable', 'del'),

                recordLevelPermissionModels.runRecordLevelPermissionQuery('root-user', 2, 'exampleTable', 'del'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('root-user', 3, 'exampleTable', 'del'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('root-user', 5, 'anotherExampleTable', 'del'),
                recordLevelPermissionModels.runRecordLevelPermissionQuery('root-user', 6, 'anotherExampleTable', 'del')
            ])

            expect(results.every(falsy => !falsy)).toBeTruthy();

            done();
        });

    });
    