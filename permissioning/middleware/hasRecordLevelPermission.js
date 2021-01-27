const Joi = require('joi');
const dependencyInjector = require('../dependency-injector');
const recordLevelPermissionModel = dependencyInjector.inject('recordLevelPermissionModel')

async function hasRecordLevelPermission(tableName, operation){
    const operationValidation = Joi.alternatives().try('get', 'post', 'update', 'delete').validate(operation);
    if(operationValidation.error){
        throw new Error('Improper operation value passed into hasRecordLevelPermission. Must be get, post, update, or delete.')
    }

    return async function(req, res, next){
        try{
            let hasPermission = false;
            const {userId} = req.headers;
            // put operations have a vulnerability since they use the id in the request body, not the params body
            // someone could pass in a record id in the path they have permission to update, while passing in 
            // a different record in the body
            const {id} = req.params;

            // get all the groups the user is a part of 
            const userGroups = await permissionGroupToUserModel.getPermissionGroupToUsers(
                // would be a good place to implement an "unlimited limit feature"
                // that or automatic pagination
                {limit: 1000, offset:0}, 
                'groupId',
                {userId}
            ).map(result => result.groupId);



            const recordLevelPermissions = await recordLevelPermissionModel.getRecordLevelPermissions(
                {limit: 2, offset:0},
                `permissionType,${operation}`,
                {
                    tableName,
                    recordId: id,
                }
            )

            // check for user permissions
            const userPermissionRecord = recordLevelPermissions.find(record => record.permissionType === 'user');
            if(userPermissionRecord){
                // if user ids contain commas (hopefully they never do), then this code wont work
                const userHasPermissionToPerformOperation = userPermissionRecord[operation].split(',').includes(userId);
                if(userHasPermissionToPerformOperation){
                    hasPermission = true;
                }
            }

            // check for group permissions
            const groupPermissionRecord = recordLevelPermissions.find(record => record.permissionType === 'group');
            if(groupPermissionRecord){
                const groupsWithPermissionToPerformOperation = groupPermissionRecord[operation].split(',').map(id => +id);
                for(let i=0; i<userGroups.length; i++){
                    // could maybe look at turning groupsWithPermissionToPerformOperation into a hashmap; but i think for most cases the n^2 effeciency will be fine
                    const userGroupId = userGroups[i];
                    const userGroupHasPermission = groupsWithPermissionToPerformOperation.includes(userGroupId);
                    if(userGroupHasPermission){
                        hasPermission = true;
                        break;
                    }
                }
            }

            if(!hasPermission){
                throw new Error('User does not have record level permission to perform this action');
            }

            next();
        }
        catch(e){
            next(e);
        }
        
    }
}

module.exports = hasRecordLevelPermission;