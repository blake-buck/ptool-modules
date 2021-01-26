
    const dependencyInjector = require('../dependency-injector.js');
    const {initializeSqlite} = require('../initialization');
    initializeSqlite(':memory:');
    const permissionGroupToUserModels = require('./permissionGroupToUser');
    
    beforeEach(async () => {
        await new Promise((resolve, reject) => {
            dependencyInjector.dependencies.sqlite.run('CREATE TABLE permissionGroupToUser(id INTEGER PRIMARY KEY ASC, userId TEXT, groupId INTEGER);', (err) => {
            if(err){
                reject(err);
            }
            else{
                dependencyInjector.dependencies.sqlite.run('INSERT INTO permissionGroupToUser(userId, groupId) VALUES("string", 0);', (err) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        dependencyInjector.dependencies.sqlite.run('INSERT INTO permissionGroupToUser(userId, groupId) VALUES("string", 0);', (err) => {
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
            dependencyInjector.dependencies.sqlite.run('DROP TABLE permissionGroupToUser', (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            });
        })
    })

    describe('permissionGroupToUser model tests ', () => {
        it('getPermissionGroupToUser should return two records', async (done) => {
            let records = await permissionGroupToUserModels.getPermissionGroupToUsers({limit:10, offset: 0}, 'id,userId,groupId');
            expect(records.length).toBe(2);

            done();
        });

        it('getSpecificPermissionGroupToUser should return a singular record', async (done) => {
            let record = await permissionGroupToUserModels.getSpecificPermissionGroupToUser(1, 'id,userId,groupId');
            expect(record).toBeTruthy();
            expect(record.id).toBeTruthy();

            done();
        });

        it('postPermissionGroupToUser should return an object with an id', async (done) => {
            let result = await permissionGroupToUserModels.postPermissionGroupToUser({"userId":"string","groupId":0});
            expect(result).toBeTruthy();
            expect(result.id).toBeTruthy();

            done();
        });

        it('updatePermissionGroupToUsers should update records', async (done) => {
            let result = await permissionGroupToUserModels.updatePermissionGroupToUsers([{"id":1,"userId":"string","groupId":0}]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM permissionGroupToUser WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"userId":"stringa","groupId":1});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })

        });

        it('updateSpecificPermissionGroupToUser should update a specific record', async (done) => {
            let result = await permissionGroupToUserModels.updateSpecificPermissionGroupToUser({"id":2,"userId":"stringa","groupId":1});
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM permissionGroupToUser WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"userId":"stringa","groupId":1});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })
        });

        it('patchPermissionGroupToUsers should update records', async (done) => {
            let result = await permissionGroupToUserModels.patchPermissionGroupToUsers([{"id":1,"userId":"string","groupId":0}]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM permissionGroupToUser WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"userId":"stringa","groupId":1});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })

        });

        it('patchSpecificPermissionGroupToUser should update a specific record', async (done) => {
            let result = await permissionGroupToUserModels.patchSpecificPermissionGroupToUser(1, {"userId":"string","groupId":0});
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM permissionGroupToUser WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"userId":"string","groupId":0});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })
        });

        it('deletePermissionGroupToUsers should delete records', async (done) => {
            let result = await permissionGroupToUserModels.deletePermissionGroupToUsers([1, 2]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.all('SELECT * FROM permissionGroupToUser', (err, result) => {
                expect(result.length).toBe(0);
                done();
            })
        });

        it('deleteSpecificPermissionGroupToUser should delete a specific record', async (done) => {
            let result = await permissionGroupToUserModels.deleteSpecificPermissionGroupToUser(1);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.all('SELECT * FROM permissionGroupToUser', (err, result) => {
                expect(result.length).toBe(1);
                done();
            })
        })

    });
    