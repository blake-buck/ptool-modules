
    const dependencyInjector = require('../dependency-injector.js');
    dependencyInjector.register('recordLevelPermissionModel', {
        getRecordLevelPermissions: () => [{id: 1}, {id: 2}],
        getSpecificRecordLevelPermission: () => ({id: 1}),
        postRecordLevelPermission: () => ({id: 1}),
        updateRecordLevelPermissions: () => true,
        updateSpecificRecordLevelPermission: () => true,
        patchRecordLevelPermissions: () => true,
        patchSpecificRecordLevelPermission: () => true,
        deleteRecordLevelPermissions : () => true,
        deleteSpecificRecordLevelPermission: () => true
    });
    const recordLevelPermissionServices = require('./recordLevelPermission');


    describe('recordLevelPermission service tests', () => {
        it('getRecordLevelPermissions should return status 200 and two records', async (done) => {
            let response = await recordLevelPermissionServices.getRecordLevelPermissions({value: {limit:10, offset: 0, fields:'id,tableName,recordId,permissionType,granteeId,get,modify,del'}});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.length).toBe(2);

            done();
        });

        it('getSpecificRecordLevelPermission should return status 200 and a singular record', async (done) => {
            let response = await recordLevelPermissionServices.getSpecificRecordLevelPermission(1,'id,tableName,recordId,permissionType,granteeId,get,modify,del');
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.id).toBe(1);

            done();
        });

        it('postRecordLevelPermission should return status 200 and an object with an id', async (done) => {
            let response = await recordLevelPermissionServices.postRecordLevelPermission({"tableName":"string","recordId":0,"permissionType":"string","granteeId":"string","get":0,"modify":0,"del":0});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.id).toBeTruthy();

            done();
        });

        it('updateRecordLevelPermissions should return status 200 and a body with a message property', async (done) => {
            let response = await recordLevelPermissionServices.updateRecordLevelPermissions([{"id":1,"tableName":"string","recordId":0,"permissionType":"string","granteeId":"string","get":0,"modify":0,"del":0}]);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('updateSpecificRecordLevelPermission should return status 200 and a body with a message property', async (done) => {
            let response = await recordLevelPermissionServices.updateSpecificRecordLevelPermission({"id":1,"tableName":"string","recordId":0,"permissionType":"string","granteeId":"string","get":0,"modify":0,"del":0});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('patchRecordLevelPermissions should return status 200 and a body with a message property', async (done) => {
            let response = await recordLevelPermissionServices.patchRecordLevelPermissions([{"id":1,"tableName":"string","recordId":0,"permissionType":"string","granteeId":"string","get":0,"modify":0,"del":0}]);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('patchSpecificRecordLevelPermission should return status 200 and a body with a message property', async (done) => {
            let response = await recordLevelPermissionServices.patchSpecificRecordLevelPermission(1, {"tableName":"string","recordId":0,"permissionType":"string","granteeId":"string","get":0,"modify":0,"del":0});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('deleteRecordLevelPermissions return status 200 and a body with a message property', async (done) => {
            let response = await recordLevelPermissionServices.deleteRecordLevelPermissions([1, 2]);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('deleteSpecificRecordLevelPermission return status 200 and a body with a message property', async (done) => {
            let response = await recordLevelPermissionServices.deleteSpecificRecordLevelPermission(1);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        })
    })
    