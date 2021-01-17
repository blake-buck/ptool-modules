const exampleModels = require('./example');

const sqlite3 = require('sqlite3');
const {initializeSqlite, sqlite} = require('../initialization');

beforeEach(async () => {
    initializeSqlite(':memory:');
    await new Promise((resolve, reject) => {
        sqlite.db.run(`CREATE TABLE example(id INTEGER PRIMARY KEY ASC, description TEXT, status INTEGER);`, (err) => {
        if(err){
            reject(err);
        }
        else{
            sqlite.db.run(`INSERT INTO example(description, status) VALUES('Example 1', 0);`, (err) => {
                if(err){
                    reject(err);
                }
                else{
                    database.db.run(`INSERT INTO example(description, status) VALUES('Example 2', 0);`, (err) => {
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
        sqlite.db.run('DROP TABLE example', (err) => {
            if(err){
                reject(err);
            }
            else{
                resolve(true);
            }
        });
    })
})

const exampleModels = require('./example');

describe('example model tests', () => {
    it('getExamples should return two records', async (done) => {
        let records = await exampleModels.getExamples({limit:10, offset: 0}, 'id,description,status');
        expect(records.length).toBe(2);

        done();
    });

    it('getSpecificExample should return an array containing a singular record', async (done) => {
        let records = await exampleModels.getSpecificExample(1, 'id,description,status');
        expect(records.length).toBe(1);

        done();
    });

    it('postExample should return an object with an id', async (done) => {
        let result = await exampleModels.postExample({description:'example', status: 14});
        expect(result).toBeTruthy();
        expect(result.id).toBeTruthy();
        expect(result.description).toBe('example');
        expect(result.status).toBe(14);

        done();
    });

    it('updateExamples should update records', async (done) => {
        let result = await exampleModels.updateExamples([
            {
                id: 1,
                description: 'updated example 1',
                status:4413
            },
            {
                id: 2,
                description: 'updated example 2',
                status: 87641
            }
        ])

        expect(result).toBeTruthy();

        sqlite.db.all('SELECT * FROM example', (err, result) => {
            const recordOne = result[0];
            const recordTwo = result[1];

            expect(recordOne.description).toBe('updated example 1');
            expect(recordOne.status).toBe(4413);

            expect(recordTwo.description).toBe('updated example 2');
            expect(recordTwo.status).toBe(87641);

            done();
        })
    });

    it('updateSpecificExample should update a specific record', async (done) => {
        const result = await exampleModels.updateSpecificExample({
            id: 1,
            description: 'test updated example 1',
            status: 12345
        });

        expect(result).toBeTruthy();

        sqlite.db.all('SELECT * FROM example where id=1', (err, result) => {
            expect(result[0]).description = 'test updated example 1';
            expect(result[0]).status = 12345;

            done();
        });
    });

    it('deleteExamples should delete records', async (done) => {
        const result = await exampleModels.deleteExamples([1, 2]);
        expect(result).toBeTruthy();

        sqlite.db.all('SELECT * FROM example', (err, result) => {
            expect(result.length).toBe(0);
            done();
        })
    });

    it('deleteSpecificExample should delete a specific record', async (done) => {
        const result = await exampleModels.deleteSpecificExample(1);
        expect(result).toBeTruthy();

        sqlite.db.all('SELECT * FROM example', (err, result) => {
            expect(result.length).toBe(1);
            done();
        })
    })

});
