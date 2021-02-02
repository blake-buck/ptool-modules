
    const dependencyInjector = require('../dependency-injector.js');
    const {initializeSqlite} = require('../initialization');
    initializeSqlite(':memory:');
    const logModels = require('./log');
    
    beforeEach(async () => {
        await new Promise((resolve, reject) => {
            dependencyInjector.dependencies.sqlite.run('CREATE TABLE log(id INTEGER PRIMARY KEY ASC, name TEXT, hostName TEXT, pid INTEGER, level INTEGER, message TEXT, fullBody TEXT, time TEXT, version INTEGER);', (err) => {
            if(err){
                reject(err);
            }
            else{
                dependencyInjector.dependencies.sqlite.run('INSERT INTO log(name, hostName, pid, level, message, fullBody, time, version) VALUES("string", "string", 0, 0, "string", "string", "string", 0);', (err) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        dependencyInjector.dependencies.sqlite.run('INSERT INTO log(name, hostName, pid, level, message, fullBody, time, version) VALUES("string", "string", 0, 0, "string", "string", "string", 0);', (err) => {
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
            dependencyInjector.dependencies.sqlite.run('DROP TABLE log', (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            });
        })
    })

    describe('log model tests ', () => {
        it('getLog should return two records', async (done) => {
            let records = await logModels.getLogs({limit:10, offset: 0}, 'id,name,hostName,pid,level,message,fullBody,time,version');
            expect(records.length).toBe(2);

            done();
        });

        it('getSpecificLog should return a singular record', async (done) => {
            let record = await logModels.getSpecificLog(1, 'id,name,hostName,pid,level,message,fullBody,time,version');
            expect(record).toBeTruthy();
            expect(record.id).toBeTruthy();

            done();
        });

    });
    