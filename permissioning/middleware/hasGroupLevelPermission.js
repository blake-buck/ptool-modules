const Joi = require('joi');
const dependencyInjector = require('../dependency-injector');
const groupLevelPermissionService = dependencyInjector.inject('groupLevelPermissionService');

function hasGroupLevelPermission(tableName, operation){
    const operationValidation = Joi.alternatives().try('get', 'post').validate(operation);
    if(operationValidation.error){
        throw new Error('Improper operation value passed into hasRecordLevelPermission. Must be get or post.')
    }

    return async function(req, res, next){
        try{
            const {userid} = req.headers;
            let groupId;
            if(operation === 'get'){
                if(typeof req.params.groupId === 'object'){
                    // Temporary hack so i can start testing queries, should really just change the query to accept an IN (groupIds) instead of an individual id
                    const groupIds = req.params.groupId.in.split(',');
                    const results = await Promise.all(
                        groupIds.map(groupId => {
                            return groupLevelPermissionService.runGroupLevelPermissionQuery({
                                userId:userid, 
                                groupId, 
                                tableName, 
                                operation
                            });
                        })
                    )

                    const hasPermission = results.every(res => res);
                    if(!hasPermission){
                        throw new Error('User does not have permission to perform action.');
                    }
                    return next();
                }
                else{
                    groupId = req.params.groupId;
                }
            }
            if(operation === 'post'){
                groupId = req.body.groupId;
            }

            const hasPermission = await groupLevelPermissionService.runGroupLevelPermissionQuery({
                userId:userid, 
                groupId, 
                tableName, 
                operation
            });
            if(!hasPermission){
                throw new Error('User does not have permission to perform action at the group level.');
            }
            next();
        }
        catch(e){
            next(e);
        }
    }
}

module.exports = hasGroupLevelPermission;