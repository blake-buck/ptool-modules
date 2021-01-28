
    const dependencyInjector = require('../dependency-injector.js');
    const {initializeSqlite} = require('../initialization');
    initializeSqlite(':memory:');
    const recordLevelPermissionModels = require('./recordLevelPermission');
    
    beforeEach(async () => {
        await new Promise((resolve, reject) => {
            dependencyInjector.dependencies.sqlite.run('CREATE TABLE recordLevelPermission(id INTEGER PRIMARY KEY ASC, tableName TEXT, recordId INTEGER, permissionType TEXT, granteeId TEXT, get INTEGER, update INTEGER, delete INTEGER);', (err) => {
            if(err){
                reject(err);
            }
            else{
                dependencyInjector.dependencies.sqlite.run('INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, update, delete) VALUES("string", 0, "string", "string", 0, 0, 0);', (err) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        dependencyInjector.dependencies.sqlite.run('INSERT INTO recordLevelPermission(tableName, recordId, permissionType, granteeId, get, update, delete) VALUES("string", 0, "string", "string", 0, 0, 0);', (err) => {
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

    describe('recordLevelPermission model tests ', () => {
        it('getRecordLevelPermission should return two records', async (done) => {
            let records = await recordLevelPermissionModels.getRecordLevelPermissions({limit:10, offset: 0}, 'id,tableName,recordId,permissionType,granteeId,get,update,delete');
            expect(records.length).toBe(2);

            done();
        });

        it('getSpecificRecordLevelPermission should return a singular record', async (done) => {
            let record = await recordLevelPermissionModels.getSpecificRecordLevelPermission(1, 'id,tableName,recordId,permissionType,granteeId,get,update,delete');
            expect(record).toBeTruthy();
            expect(record.id).toBeTruthy();

            done();
        });

        it('postRecordLevelPermission should return an object with an id', async (done) => {
            let result = await recordLevelPermissionModels.postRecordLevelPermission({"tableName":"string","recordId":0,"permissionType":"string","granteeId":"string","get":0,"update":0,"delete":0});
            expect(result).toBeTruthy();
            expect(result.id).toBeTruthy();

            done();
        });

        it('updateRecordLevelPermissions should update records', async (done) => {
            let result = await recordLevelPermissionModels.updateRecordLevelPermissions([{"id":1,"tableName":"string","recordId":0,"permissionType":"string","granteeId":"string","get":0,"update":0,"delete":0}]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM recordLevelPermission WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"tableName":"stringa","recordId":1,"permissionType":"stringa","granteeId":"stringa","get":1,"update":1,"delete":1});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })

        });

        it('updateSpecificRecordLevelPermission should update a specific record', async (done) => {
            let result = await recordLevelPermissionModels.updateSpecificRecordLevelPermission({"id":2,"tableName":"stringa","recordId":1,"permissionType":"stringa","granteeId":"stringa","get":1,"update":1,"delete":1});
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM recordLevelPermission WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"tableName":"stringa","recordId":1,"permissionType":"stringa","granteeId":"stringa","get":1,"update":1,"delete":1});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })
        });

        it('patchRecordLevelPermissions should update records', async (done) => {
            let result = await recordLevelPermissionModels.patchRecordLevelPermissions([{"id":1,"tableName":"string","recordId":0,"permissionType":"string","granteeId":"string","get":0,"update":0,"delete":0}]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM recordLevelPermission WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"tableName":"stringa","recordId":1,"permissionType":"stringa","granteeId":"stringa","get":1,"update":1,"delete":1});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })

        });

        it('patchSpecificRecordLevelPermission should update a specific record', async (done) => {
            let result = await recordLevelPermissionModels.patchSpecificRecordLevelPermission(1, {"tableName":"string","recordId":0,"permissionType":"string","granteeId":"string","get":0,"update":0,"delete":0});
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM recordLevelPermission WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"tableName":"string","recordId":0,"permissionType":"string","granteeId":"string","get":0,"update":0,"delete":0});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })
        });

        it('deleteRecordLevelPermissions should delete records', async (done) => {
            let result = await recordLevelPermissionModels.deleteRecordLevelPermissions([1, 2]);
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
                expect(result.length).toBe(1);
                done();
            })
        })

    });
    