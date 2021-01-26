
    const dependencyInjector = require('../dependency-injector.js');
    const {initializeSqlite} = require('../initialization');
    initializeSqlite(':memory:');
    const permissionGroupToPermissionModels = require('./permissionGroupToPermission');
    
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

    describe('permissionGroupToPermission model tests ', () => {
        it('getPermissionGroupToPermission should return two records', async (done) => {
            let records = await permissionGroupToPermissionModels.getPermissionGroupToPermissions({limit:10, offset: 0}, 'id,groupId,permissionId');
            expect(records.length).toBe(2);

            done();
        });

        it('getSpecificPermissionGroupToPermission should return a singular record', async (done) => {
            let record = await permissionGroupToPermissionModels.getSpecificPermissionGroupToPermission(1, 'id,groupId,permissionId');
            expect(record).toBeTruthy();
            expect(record.id).toBeTruthy();

            done();
        });

        it('postPermissionGroupToPermission should return an object with an id', async (done) => {
            let result = await permissionGroupToPermissionModels.postPermissionGroupToPermission({"groupId":0,"permissionId":0});
            expect(result).toBeTruthy();
            expect(result.id).toBeTruthy();

            done();
        });

        it('updatePermissionGroupToPermissions should update records', async (done) => {
            let result = await permissionGroupToPermissionModels.updatePermissionGroupToPermissions([{"id":1,"groupId":0,"permissionId":0}]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM permissionGroupToPermission WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"groupId":1,"permissionId":1});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })

        });

        it('updateSpecificPermissionGroupToPermission should update a specific record', async (done) => {
            let result = await permissionGroupToPermissionModels.updateSpecificPermissionGroupToPermission({"id":2,"groupId":1,"permissionId":1});
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM permissionGroupToPermission WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"groupId":1,"permissionId":1});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })
        });

        it('patchPermissionGroupToPermissions should update records', async (done) => {
            let result = await permissionGroupToPermissionModels.patchPermissionGroupToPermissions([{"id":1,"groupId":0,"permissionId":0}]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM permissionGroupToPermission WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"groupId":1,"permissionId":1});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })

        });

        it('patchSpecificPermissionGroupToPermission should update a specific record', async (done) => {
            let result = await permissionGroupToPermissionModels.patchSpecificPermissionGroupToPermission(1, {"groupId":0,"permissionId":0});
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM permissionGroupToPermission WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"groupId":0,"permissionId":0});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })
        });

        it('deletePermissionGroupToPermissions should delete records', async (done) => {
            let result = await permissionGroupToPermissionModels.deletePermissionGroupToPermissions([1, 2]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.all('SELECT * FROM permissionGroupToPermission', (err, result) => {
                expect(result.length).toBe(0);
                done();
            })
        });

        it('deleteSpecificPermissionGroupToPermission should delete a specific record', async (done) => {
            let result = await permissionGroupToPermissionModels.deleteSpecificPermissionGroupToPermission(1);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.all('SELECT * FROM permissionGroupToPermission', (err, result) => {
                expect(result.length).toBe(1);
                done();
            })
        })

    });
    