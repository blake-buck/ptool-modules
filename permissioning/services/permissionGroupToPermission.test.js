
    const dependencyInjector = require('../dependency-injector.js');
    dependencyInjector.register('permissionGroupToPermissionModel', {
        getPermissionGroupToPermissions: () => [{id: 1}, {id: 2}],
        getSpecificPermissionGroupToPermission: () => ({id: 1}),
        postPermissionGroupToPermission: () => ({id: 1}),
        updatePermissionGroupToPermissions: () => true,
        updateSpecificPermissionGroupToPermission: () => true,
        patchPermissionGroupToPermissions: () => true,
        patchSpecificPermissionGroupToPermission: () => true,
        deletePermissionGroupToPermissions : () => true,
        deleteSpecificPermissionGroupToPermission: () => true
    });
    const permissionGroupToPermissionServices = require('./permissionGroupToPermission');


    describe('permissionGroupToPermission service tests', () => {
        it('getPermissionGroupToPermissions should return status 200 and two records', async (done) => {
            let response = await permissionGroupToPermissionServices.getPermissionGroupToPermissions({value: {limit:10, offset: 0, fields:'id,groupId,permissionId'}});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.length).toBe(2);

            done();
        });

        it('getSpecificPermissionGroupToPermission should return status 200 and a singular record', async (done) => {
            let response = await permissionGroupToPermissionServices.getSpecificPermissionGroupToPermission(1,'id,groupId,permissionId');
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.id).toBe(1);

            done();
        });

        it('postPermissionGroupToPermission should return status 200 and an object with an id', async (done) => {
            let response = await permissionGroupToPermissionServices.postPermissionGroupToPermission({"groupId":0,"permissionId":0});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.id).toBeTruthy();

            done();
        });

        it('updatePermissionGroupToPermissions should return status 200 and a body with a message property', async (done) => {
            let response = await permissionGroupToPermissionServices.updatePermissionGroupToPermissions([{"id":1,"groupId":0,"permissionId":0}]);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('updateSpecificPermissionGroupToPermission should return status 200 and a body with a message property', async (done) => {
            let response = await permissionGroupToPermissionServices.updateSpecificPermissionGroupToPermission({"id":1,"groupId":0,"permissionId":0});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('patchPermissionGroupToPermissions should return status 200 and a body with a message property', async (done) => {
            let response = await permissionGroupToPermissionServices.patchPermissionGroupToPermissions([{"id":1,"groupId":0,"permissionId":0}]);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('patchSpecificPermissionGroupToPermission should return status 200 and a body with a message property', async (done) => {
            let response = await permissionGroupToPermissionServices.patchSpecificPermissionGroupToPermission(1, {"groupId":0,"permissionId":0});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('deletePermissionGroupToPermissions return status 200 and a body with a message property', async (done) => {
            let response = await permissionGroupToPermissionServices.deletePermissionGroupToPermissions([1, 2]);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('deleteSpecificPermissionGroupToPermission return status 200 and a body with a message property', async (done) => {
            let response = await permissionGroupToPermissionServices.deleteSpecificPermissionGroupToPermission(1);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        })
    })
    