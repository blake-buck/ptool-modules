
    const dependencyInjector = require('../dependency-injector.js');
    dependencyInjector.register('permissionGroupModel', {
        getPermissionGroups: () => [{id: 1}, {id: 2}],
        getSpecificPermissionGroup: () => ({id: 1}),
        postPermissionGroup: () => ({id: 1}),
        updatePermissionGroups: () => true,
        updateSpecificPermissionGroup: () => true,
        patchPermissionGroups: () => true,
        patchSpecificPermissionGroup: () => true,
        deletePermissionGroups : () => true,
        deleteSpecificPermissionGroup: () => true
    });
    const permissionGroupServices = require('./permissionGroup');


    describe('permissionGroup service tests', () => {
        it('getPermissionGroups should return status 200 and two records', async (done) => {
            let response = await permissionGroupServices.getPermissionGroups({value: {limit:10, offset: 0, fields:'id,name,description'}});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.length).toBe(2);

            done();
        });

        it('getSpecificPermissionGroup should return status 200 and a singular record', async (done) => {
            let response = await permissionGroupServices.getSpecificPermissionGroup(1,'id,name,description');
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.id).toBe(1);

            done();
        });

        it('postPermissionGroup should return status 200 and an object with an id', async (done) => {
            let response = await permissionGroupServices.postPermissionGroup({"name":"string","description":"string"});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.id).toBeTruthy();

            done();
        });

        it('updatePermissionGroups should return status 200 and a body with a message property', async (done) => {
            let response = await permissionGroupServices.updatePermissionGroups([{"id":1,"name":"string","description":"string"}]);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('updateSpecificPermissionGroup should return status 200 and a body with a message property', async (done) => {
            let response = await permissionGroupServices.updateSpecificPermissionGroup({"id":1,"name":"string","description":"string"});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('patchPermissionGroups should return status 200 and a body with a message property', async (done) => {
            let response = await permissionGroupServices.patchPermissionGroups([{"id":1,"name":"string","description":"string"}]);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('patchSpecificPermissionGroup should return status 200 and a body with a message property', async (done) => {
            let response = await permissionGroupServices.patchSpecificPermissionGroup(1, {"name":"string","description":"string"});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('deletePermissionGroups return status 200 and a body with a message property', async (done) => {
            let response = await permissionGroupServices.deletePermissionGroups([1, 2]);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('deleteSpecificPermissionGroup return status 200 and a body with a message property', async (done) => {
            let response = await permissionGroupServices.deleteSpecificPermissionGroup(1);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        })
    })
    