
    const dependencyInjector = require('../dependency-injector.js');
    dependencyInjector.register('permissionGroupToUserModel', {
        getPermissionGroupToUsers: () => [{id: 1}, {id: 2}],
        getSpecificPermissionGroupToUser: () => ({id: 1}),
        postPermissionGroupToUser: () => ({id: 1}),
        updatePermissionGroupToUsers: () => true,
        updateSpecificPermissionGroupToUser: () => true,
        patchPermissionGroupToUsers: () => true,
        patchSpecificPermissionGroupToUser: () => true,
        deletePermissionGroupToUsers : () => true,
        deleteSpecificPermissionGroupToUser: () => true
    });
    const permissionGroupToUserServices = require('./permissionGroupToUser');


    describe('permissionGroupToUser service tests', () => {
        it('getPermissionGroupToUsers should return status 200 and two records', async (done) => {
            let response = await permissionGroupToUserServices.getPermissionGroupToUsers({limit:10, offset: 0}, 'undefined');
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.length).toBe(2);

            done();
        });

        it('getSpecificPermissionGroupToUser should return status 200 and a singular record', async (done) => {
            let response = await permissionGroupToUserServices.getSpecificPermissionGroupToUser(1,'undefined');
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.id).toBe(1);

            done();
        });

        it('postPermissionGroupToUser should return status 200 and an object with an id', async (done) => {
            let response = await permissionGroupToUserServices.postPermissionGroupToUser({"userId":"string","groupId":0});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.id).toBeTruthy();

            done();
        });

        it('updatePermissionGroupToUsers should return status 200 and a body with a message property', async (done) => {
            let response = await permissionGroupToUserServices.updatePermissionGroupToUsers([{"id":1,"userId":"string","groupId":0}]);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('updateSpecificPermissionGroupToUser should return status 200 and a body with a message property', async (done) => {
            let response = await permissionGroupToUserServices.updateSpecificPermissionGroupToUser({"id":1,"userId":"string","groupId":0});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('patchPermissionGroupToUsers should return status 200 and a body with a message property', async (done) => {
            let response = await permissionGroupToUserServices.patchPermissionGroupToUsers([{"id":1,"userId":"string","groupId":0}]);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('patchSpecificPermissionGroupToUser should return status 200 and a body with a message property', async (done) => {
            let response = await permissionGroupToUserServices.patchSpecificPermissionGroupToUser(1, {"userId":"string","groupId":0});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('deletePermissionGroupToUsers return status 200 and a body with a message property', async (done) => {
            let response = await permissionGroupToUserServices.deletePermissionGroupToUsers([1, 2]);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('deleteSpecificPermissionGroupToUser return status 200 and a body with a message property', async (done) => {
            let response = await permissionGroupToUserServices.deleteSpecificPermissionGroupToUser(1);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        })
    })
    