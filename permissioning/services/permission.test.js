
    const dependencyInjector = require('../dependency-injector.js');
    dependencyInjector.register('permissionModel', {
        getPermissions: () => [{id: 1}, {id: 2}],
        getSpecificPermission: () => ({id: 1}),
        postPermission: () => ({id: 1}),
        updatePermissions: () => true,
        updateSpecificPermission: () => true,
        patchPermissions: () => true,
        patchSpecificPermission: () => true,
        deletePermissions : () => true,
        deleteSpecificPermission: () => true
    });
    const permissionServices = require('./permission');


    describe('permission service tests', () => {
        it('getPermissions should return status 200 and two records', async (done) => {
            let response = await permissionServices.getPermissions({value: {limit:10, offset: 0, fields:'id,name,description'}});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.length).toBe(2);

            done();
        });

        it('getSpecificPermission should return status 200 and a singular record', async (done) => {
            let response = await permissionServices.getSpecificPermission(1,'id,name,description');
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.id).toBe(1);

            done();
        });

        it('postPermission should return status 200 and an object with an id', async (done) => {
            let response = await permissionServices.postPermission({"name":"string","description":"string"});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.id).toBeTruthy();

            done();
        });

        it('updatePermissions should return status 200 and a body with a message property', async (done) => {
            let response = await permissionServices.updatePermissions([{"id":1,"name":"string","description":"string"}]);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('updateSpecificPermission should return status 200 and a body with a message property', async (done) => {
            let response = await permissionServices.updateSpecificPermission({"id":1,"name":"string","description":"string"});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('patchPermissions should return status 200 and a body with a message property', async (done) => {
            let response = await permissionServices.patchPermissions([{"id":1,"name":"string","description":"string"}]);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('patchSpecificPermission should return status 200 and a body with a message property', async (done) => {
            let response = await permissionServices.patchSpecificPermission(1, {"name":"string","description":"string"});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('deletePermissions return status 200 and a body with a message property', async (done) => {
            let response = await permissionServices.deletePermissions([1, 2]);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('deleteSpecificPermission return status 200 and a body with a message property', async (done) => {
            let response = await permissionServices.deleteSpecificPermission(1);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        })
    })
    