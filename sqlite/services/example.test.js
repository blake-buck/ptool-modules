const dependencyInjector = require('../dependency-injector.js');
dependencyInjector.register('exampleModel', () => ({
    getExamples: () => [
        {
            id: 2,
            description: 'descr',
            status: 5
        },
        {
            id: 3,
            description: 'descr',
            status: 5
        }
    ],
    getSpecificExample: () => ({
        id: 1,
        description: 'descr',
        status: 5
    }),
    postExample: () => ({
        id: 1,
        description: 'descr',
        status: 5
    }),
    updateExamples: () => true,
    updateSpecificExample: () => true,
    patchExamples: () => true,
    patchSpecificExample: () => true,
    deleteExamples: () => true,
    deleteSpecificExample: () => true
}));
const exampleServices = require('./example');

describe('example service tests', () => {
    
    it('getExamples should return two records', async (done) => {
        let response = await exampleServices.getExamples({value:{limit:10, offset: 0, fields: 'id,description,status'}});
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
        expect(response.body.length).toBe(2);

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

    it('patchExamples should update records', async (done) => {
        let response = await exampleServices.patchExamples([
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

    it('patchSpecificExample should update a specific record', async (done) => {
        const response = await exampleServices.patchSpecificExample(
            1,
            {
                description: 'test updated example 1',
                status: 12345
            }
        );

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