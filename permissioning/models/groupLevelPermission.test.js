
    const dependencyInjector = require('../dependency-injector.js');
    const {initializeSqlite} = require('../initialization');
    initializeSqlite(':memory:');
    const groupLevelPermissionModels = require('./groupLevelPermission');
    
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
        })

    });
    