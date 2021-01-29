
    const dependencyInjector = require('../dependency-injector.js');

    dependencyInjector.register('recordLevelPermissionService', () => ({}));
    dependencyInjector.register('permissionGroupToUserModel', () => ({}));
    dependencyInjector.register('permissionGroupToPermissionModel', () => ({}));
    dependencyInjector.register('permissionModel', () => ({}));
    dependencyInjector.register('groupLevelPermissionService', () => ({}));
    
    const {initializeSqlite} = require('../initialization');
    initializeSqlite(':memory:');
    const permissionGroupModels = require('./permissionGroup');
    
    beforeEach(async () => {
        await new Promise((resolve, reject) => {
            dependencyInjector.dependencies.sqlite.run('CREATE TABLE permissionGroup(id INTEGER PRIMARY KEY ASC, name TEXT, description TEXT);', (err) => {
            if(err){
                reject(err);
            }
            else{
                dependencyInjector.dependencies.sqlite.run('INSERT INTO permissionGroup(name, description) VALUES("string", "string");', (err) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        dependencyInjector.dependencies.sqlite.run('INSERT INTO permissionGroup(name, description) VALUES("string", "string");', (err) => {
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
            dependencyInjector.dependencies.sqlite.run('DROP TABLE permissionGroup', (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            });
        })
    })

    describe('permissionGroup model tests ', () => {
        it('getPermissionGroup should return two records', async (done) => {
            let records = await permissionGroupModels.getPermissionGroups({limit:10, offset: 0}, 'id,name,description');
            expect(records.length).toBe(2);

            done();
        });

        it('getSpecificPermissionGroup should return a singular record', async (done) => {
            let record = await permissionGroupModels.getSpecificPermissionGroup(1, 'id,name,description');
            expect(record).toBeTruthy();
            expect(record.id).toBeTruthy();

            done();
        });

        it('postPermissionGroup should return an object with an id', async (done) => {
            let result = await permissionGroupModels.postPermissionGroup({"name":"string","description":"string"});
            expect(result).toBeTruthy();
            expect(result.id).toBeTruthy();

            done();
        });

        it('updatePermissionGroups should update records', async (done) => {
            let result = await permissionGroupModels.updatePermissionGroups([{"id":1,"name":"string","description":"string"}]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM permissionGroup WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"name":"stringa","description":"stringa"});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })

        });

        it('updateSpecificPermissionGroup should update a specific record', async (done) => {
            let result = await permissionGroupModels.updateSpecificPermissionGroup({"id":2,"name":"stringa","description":"stringa"});
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM permissionGroup WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"name":"stringa","description":"stringa"});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })
        });

        it('patchPermissionGroups should update records', async (done) => {
            let result = await permissionGroupModels.patchPermissionGroups([{"id":1,"name":"string","description":"string"}]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM permissionGroup WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"name":"stringa","description":"stringa"});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })

        });

        it('patchSpecificPermissionGroup should update a specific record', async (done) => {
            let result = await permissionGroupModels.patchSpecificPermissionGroup(1, {"name":"string","description":"string"});
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM permissionGroup WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"name":"string","description":"string"});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })
        });

        it('deletePermissionGroups should delete records', async (done) => {
            let result = await permissionGroupModels.deletePermissionGroups([1, 2]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.all('SELECT * FROM permissionGroup', (err, result) => {
                expect(result.length).toBe(0);
                done();
            })
        });

        it('deleteSpecificPermissionGroup should delete a specific record', async (done) => {
            let result = await permissionGroupModels.deleteSpecificPermissionGroup(1);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.all('SELECT * FROM permissionGroup', (err, result) => {
                expect(result.length).toBe(1);
                done();
            })
        })

    });
    