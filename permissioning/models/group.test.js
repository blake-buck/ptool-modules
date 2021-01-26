
    const dependencyInjector = require('../dependency-injector.js');
    const {initializeSqlite} = require('../initialization');
    initializeSqlite(':memory:');
    const groupModels = require('./group');
    
    beforeEach(async () => {
        await new Promise((resolve, reject) => {
            dependencyInjector.dependencies.sqlite.run('CREATE TABLE group(id INTEGER PRIMARY KEY ASC, name TEXT, description TEXT);', (err) => {
            if(err){
                reject(err);
            }
            else{
                dependencyInjector.dependencies.sqlite.run('INSERT INTO group(name, description) VALUES("string", "string");', (err) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        dependencyInjector.dependencies.sqlite.run('INSERT INTO group(name, description) VALUES("string", "string");', (err) => {
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
            dependencyInjector.dependencies.sqlite.run('DROP TABLE group', (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            });
        })
    })

    describe('group model tests ', () => {
        it('getGroup should return two records', async (done) => {
            let records = await groupModels.getGroups({limit:10, offset: 0}, 'id,name,description');
            expect(records.length).toBe(2);

            done();
        });

        it('getSpecificGroup should return a singular record', async (done) => {
            let record = await groupModels.getSpecificGroup(1, 'id,name,description');
            expect(record).toBeTruthy();
            expect(record.id).toBeTruthy();

            done();
        });

        it('postGroup should return an object with an id', async (done) => {
            let result = await groupModels.postGroup({"name":"string","description":"string"});
            expect(result).toBeTruthy();
            expect(result.id).toBeTruthy();

            done();
        });

        it('updateGroups should update records', async (done) => {
            let result = await groupModels.updateGroups([{"id":1,"name":"string","description":"string"}]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM group WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"name":"stringa","description":"stringa"});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })

        });

        it('updateSpecificGroup should update a specific record', async (done) => {
            let result = await groupModels.updateSpecificGroup({"id":2,"name":"stringa","description":"stringa"});
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM group WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"name":"stringa","description":"stringa"});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })
        });

        it('patchGroups should update records', async (done) => {
            let result = await groupModels.patchGroups([{"id":1,"name":"string","description":"string"}]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM group WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"id":2,"name":"stringa","description":"stringa"});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })

        });

        it('patchSpecificGroup should update a specific record', async (done) => {
            let result = await groupModels.patchSpecificGroup(1, {"name":"string","description":"string"});
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.get('SELECT * FROM group WHERE id=1', (err, row) => {
                const oldRecord = JSON.stringify({"name":"string","description":"string"});
                const updatedRecord = JSON.stringify(row);

                expect(oldRecord === updatedRecord).toBe(false);
                done();
            })
        });

        it('deleteGroups should delete records', async (done) => {
            let result = await groupModels.deleteGroups([1, 2]);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.all('SELECT * FROM group', (err, result) => {
                expect(result.length).toBe(0);
                done();
            })
        });

        it('deleteSpecificGroup should delete a specific record', async (done) => {
            let result = await groupModels.deleteSpecificGroup(1);
            expect(result).toBeTruthy();

            dependencyInjector.dependencies.sqlite.all('SELECT * FROM group', (err, result) => {
                expect(result.length).toBe(1);
                done();
            })
        })

    });
    