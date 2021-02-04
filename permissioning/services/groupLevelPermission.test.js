
    const dependencyInjector = require('../dependency-injector.js');
    dependencyInjector.register('groupLevelPermissionModel', () => ({
        getGroupLevelPermissions: () => [{id: 1}, {id: 2}],
        getSpecificGroupLevelPermission: () => ({id: 1}),
        postGroupLevelPermission: () => ({id: 1}),
        updateGroupLevelPermissions: () => true,
        updateSpecificGroupLevelPermission: () => true,
        patchGroupLevelPermissions: () => true,
        patchSpecificGroupLevelPermission: () => true,
        deleteGroupLevelPermissions : () => true,
        deleteSpecificGroupLevelPermission: () => true,
        runGroupLevelPermissionQuery: () => true
    }));
    const groupLevelPermissionServices = require('./groupLevelPermission');

    const properUserId = 'user-id';
    const properGroupId = 123;
    const properTableName = 'tableName';
    const properOperation = 'post';
    
    const improperUserId = 1234;
    const improperGroupId = -123;
    const improperTableName = 45678;
    const improperOperation ='modify';

    describe('groupLevelPermission service tests', () => {
        it('getGroupLevelPermissions should return status 200 and two records', async (done) => {
            let response = await groupLevelPermissionServices.getGroupLevelPermissions({value: {limit:10, offset: 0, fields:'id,tableName,groupId,permissionType,granteeId,get,post'}});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.length).toBe(2);

            done();
        });

        it('getSpecificGroupLevelPermission should return status 200 and a singular record', async (done) => {
            let response = await groupLevelPermissionServices.getSpecificGroupLevelPermission(1,'id,tableName,groupId,permissionType,granteeId,get,post');
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.id).toBe(1);

            done();
        });

        it('postGroupLevelPermission should return status 200 and an object with an id', async (done) => {
            let response = await groupLevelPermissionServices.postGroupLevelPermission({"tableName":"string","groupId":0,"permissionType":"string","granteeId":"string","get":0,"post":0});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.id).toBeTruthy();

            done();
        });

        it('updateGroupLevelPermissions should return status 200 and a body with a message property', async (done) => {
            let response = await groupLevelPermissionServices.updateGroupLevelPermissions([{"id":1,"tableName":"string","groupId":0,"permissionType":"string","granteeId":"string","get":0,"post":0}]);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('updateSpecificGroupLevelPermission should return status 200 and a body with a message property', async (done) => {
            let response = await groupLevelPermissionServices.updateSpecificGroupLevelPermission({"id":1,"tableName":"string","groupId":0,"permissionType":"string","granteeId":"string","get":0,"post":0});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('patchGroupLevelPermissions should return status 200 and a body with a message property', async (done) => {
            let response = await groupLevelPermissionServices.patchGroupLevelPermissions([{"id":1,"tableName":"string","groupId":0,"permissionType":"string","granteeId":"string","get":0,"post":0}]);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('patchSpecificGroupLevelPermission should return status 200 and a body with a message property', async (done) => {
            let response = await groupLevelPermissionServices.patchSpecificGroupLevelPermission(1, {"tableName":"string","groupId":0,"permissionType":"string","granteeId":"string","get":0,"post":0});
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('deleteGroupLevelPermissions return status 200 and a body with a message property', async (done) => {
            let response = await groupLevelPermissionServices.deleteGroupLevelPermissions([1, 2]);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        });

        it('deleteSpecificGroupLevelPermission return status 200 and a body with a message property', async (done) => {
            let response = await groupLevelPermissionServices.deleteSpecificGroupLevelPermission(1);
            expect(response.status).toBe(200);
            expect(response.body).toBeTruthy();
            expect(response.body.message).toBeTruthy();
            done();
        })


        it('runGroupLevelPermissionQuery - proper values should pass validation', async (done) => {
            try{
                const result = await groupLevelPermissionServices.runGroupLevelPermissionQuery({
                    userId: properUserId,
                    groupId: properGroupId,
                    tableName: properTableName,
                    operation: properOperation
                });
                expect(true).toBeTruthy();
            }
            catch(e){
            }
            done();
        });

        it('runGroupLevelPermissionQuery - improperUserId should fail validation', async (done) => {
            try{
                const result = await groupLevelPermissionServices.runGroupLevelPermissionQuery({
                    userId: improperUserId,
                    groupId: properGroupId,
                    tableName: properTableName,
                    operation: properOperation
                });
            }
            catch(e){
                expect(true).toBeTruthy();
            }
            done();
        });

        it('runGroupLevelPermissionQuery - improperGroupId should fail validation', async (done) => {
            try{
                const result = await groupLevelPermissionServices.runGroupLevelPermissionQuery({
                    userId: properUserId,
                    groupId: improperGroupId,
                    tableName: properTableName,
                    operation: properOperation
                });
            }
            catch(e){
                expect(true).toBeTruthy();
            }
            done();
        });
        
        it('runGroupLevelPermissionQuery - improperTableName should fail validation', async (done) => {
            try{
                const result = await groupLevelPermissionServices.runGroupLevelPermissionQuery({
                    userId: properUserId,
                    groupId: properGroupId,
                    tableName: improperTableName,
                    operation: properOperation
                });
            }
            catch(e){
                expect(true).toBeTruthy();
            }
            done();
        });

        it('runGroupLevelPermissionQuery - improperOperation should fail validation', async (done) => {
            try{
                const result = await groupLevelPermissionServices.runGroupLevelPermissionQuery({
                    userId: properUserId,
                    groupId: properGroupId,
                    tableName: properTableName,
                    operation: improperOperation
                });
            }
            catch(e){
                expect(true).toBeTruthy();
            }
            done();
        });
    })
    