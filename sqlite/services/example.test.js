const exampleServices = require('./example');

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
                    sqlite.db.run(`INSERT INTO example(description, status) VALUES('Example 2', 0);`, (err) => {
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


describe('example service tests', () => {
    it('getExamples should return two records', async (done) => {
        let response = await exampleServices.getExamples({limit:10, offset: 0}, 'id,description,status');
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();

        done();
    });

    it('getSpecificExample should return a singular record', async (done) => {
        let response = await exampleServices.getSpecificExample(1, 'id,description,status');
        expect(response).toBeTruthy()
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
        expect(response.body.id).toBeTruthy();
        expect(response.body.description).toBeTruthy();

        done();
    });

    it('postExample should return an object with an id', async (done) => {
        let response = await exampleServices.postExample({description:'example', status: 14});
        expect(response).toBeTruthy()
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
        expect(response.body.id).toBeTruthy();
        expect(response.body.description).toBeTruthy();
        expect(response.body.status).toBeTruthy();

        done();
    });

    it('updateExamples should update records', async (done) => {
        let response = await exampleServices.updateExamples([
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

        expect(response).toBeTruthy()
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();

        done();
    });

    it('updateSpecificExample should update a specific record', async (done) => {
        const response = await exampleServices.updateSpecificExample({
            id: 1,
            description: 'test updated example 1',
            status: 12345
        });

        expect(response).toBeTruthy();
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();

        done();
        
    });

    it('deleteExamples should delete records', async (done) => {
        const response = await exampleServices.deleteExamples([1, 2]);
        
        expect(response).toBeTruthy();
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();

        done();
    });

    it('deleteSpecificExample should delete a specific record', async (done) => {
        const response = await exampleServices.deleteSpecificExample(1);
        expect(response).toBeTruthy();
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();

        done();
    })
})