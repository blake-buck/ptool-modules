
    const dependencyInjector = require('../dependency-injector.js');
    dependencyInjector.register('groupModel', {
        getGroups: () => [{id: 1}, {id: 2}],
        getSpecificGroup: () => ({id: 1}),
        postGroup: () => ({id: 1}),
        updateGroups: () => true,
        updateSpecificGroup: () => true,
        patchGroups: () => true,
        patchSpecificGroup: () => true,
        deleteGroups : () => true,
        deleteSpecificGroup: () => true
    });
    const groupServices = require('./group');


    describe('group service tests', () => {
        it('getGroups should return status 200 and two records', async (done) => {
            let response = await groupServices.getGroups({value: {limit:10, offset: 0, fields:'id,name,description'}});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.length).toBe(2);

            done();
        });

        it('getSpecificGroup should return status 200 and a singular record', async (done) => {
            let response = await groupServices.getSpecificGroup(1,'id,name,description');
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.id).toBe(1);

            done();
        });

        it('postGroup should return status 200 and an object with an id', async (done) => {
            let response = await groupServices.postGroup({"name":"string","description":"string"});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.id).toBeTruthy();

            done();
        });

        it('updateGroups should return status 200 and a body with a message property', async (done) => {
            let response = await groupServices.updateGroups([{"id":1,"name":"string","description":"string"}]);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('updateSpecificGroup should return status 200 and a body with a message property', async (done) => {
            let response = await groupServices.updateSpecificGroup({"id":1,"name":"string","description":"string"});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('patchGroups should return status 200 and a body with a message property', async (done) => {
            let response = await groupServices.patchGroups([{"id":1,"name":"string","description":"string"}]);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('patchSpecificGroup should return status 200 and a body with a message property', async (done) => {
            let response = await groupServices.patchSpecificGroup(1, {"name":"string","description":"string"});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('deleteGroups return status 200 and a body with a message property', async (done) => {
            let response = await groupServices.deleteGroups([1, 2]);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('deleteSpecificGroup return status 200 and a body with a message property', async (done) => {
            let response = await groupServices.deleteSpecificGroup(1);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        })
    })
    