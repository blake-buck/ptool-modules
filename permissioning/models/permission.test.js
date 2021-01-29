
    const dependencyInjector = require('../dependency-injector.js');

    dependencyInjector.register('recordLevelPermissionService', () => ({}));
    dependencyInjector.register('permissionGroupToUserModel', () => ({}));
    dependencyInjector.register('permissionGroupToPermissionModel', () => ({}));
    dependencyInjector.register('permissionModel', () => ({}));
    dependencyInjector.register('groupLevelPermissionService', () => ({}));
    
    const {initializeSqlite} = require('../initialization');
    initializeSqlite(':memory:');
    const permissionModels = require('./permission');
    
    beforeEach(async () => {
        await new Promise((resolve, reject) => {
            dependencyInjector.dependencies.sqlite.run('CREATE TABLE permission(id INTEGER PRIMARY KEY ASC, name TEXT, description TEXT);', (err) => {
            if(err){
                reject(err);
            }
            else{
                dependencyInjector.dependencies.sqlite.run('INSERT INTO permission(name, description) VALUES("string", "string");', (err) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        dependencyInjector.dependencies.sqlite.run('INSERT INTO permission(name, description) VALUES("string", "string");', (err) => {
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
            dependencyInjector.dependencies.sqlite.run('DROP TABLE permission', (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            });
        })
    })

    describe('permission model tests ', () => {
        it('getPermission should return two records', async (done) => {
            let records = await permissionModels.getPermissions({limit:10, offset: 0}, 'id,name,description');
            expect(records.length).toBe(2);

            done();
        });

        it('getSpecificPermission should return a singular record', async (done) => {
            let record = await permissionModels.getSpecificPermission(1, 'id,name,description');
            expect(record).toBeTruthy();
            expect(record.id).toBeTruthy();

            done();
        });

        it('postPermission should return an object with an id', async (done) => {
            let result = await permissionModels.postPermission({"name":"string","description":"string"});
            expect(result).toBeTruthy();
            expect(result.id).toBeTruthy();

            done();
        });

        it('updatePermissions should update records', async (done) => {
            let result = await permissionModels.updatePermissions([{"id":1,"name":"string","description":"string"}]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM permission WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"name":"stringa","description":"stringa"});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })

        });

        it('updateSpecificPermission should update a specific record', async (done) => {
            let result = await permissionModels.updateSpecificPermission({"id":2,"name":"stringa","description":"stringa"});
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM permission WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"name":"stringa","description":"stringa"});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })
        });

        it('patchPermissions should update records', async (done) => {
            let result = await permissionModels.patchPermissions([{"id":1,"name":"string","description":"string"}]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM permission WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"name":"stringa","description":"stringa"});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })

        });

        it('patchSpecificPermission should update a specific record', async (done) => {
            let result = await permissionModels.patchSpecificPermission(1, {"name":"string","description":"string"});
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM permission WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"name":"string","description":"string"});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })
        });

        it('deletePermissions should delete records', async (done) => {
            let result = await permissionModels.deletePermissions([1, 2]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.all('SELECT * FROM permission', (err, result) => {
                expect(result.length).toBe(0);
                done();
            })
        });

        it('deleteSpecificPermission should delete a specific record', async (done) => {
            let result = await permissionModels.deleteSpecificPermission(1);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.all('SELECT * FROM permission', (err, result) => {
                expect(result.length).toBe(1);
                done();
            })
        })

    });
    