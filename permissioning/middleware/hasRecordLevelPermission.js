const Joi = require('joi');
const dependencyInjector = require('../dependency-injector');
const recordLevelPermissionService = dependencyInjector.inject('recordLevelPermissionService');


function hasRecordLevelPermission(tableName, operation){
    const operationValidation = Joi.alternatives().try('get', 'modify', 'del').validate(operation);
    if(operationValidation.error){
        throw new Error('Improper operation value passed into hasRecordLevelPermission. Must be get, modify, or del.')
    }

    return async function(req, res, next){
        try{
            const {userid} = req.headers;
            // put operations have a vulnerability since they use the id in the request body, not the params body
            // someone could pass in a record id in the path they have permission to update, while passing in 
            // a different record in the body
            const {id} = req.params;

            const hasPermission = await recordLevelPermissionService.runRecordLevelPermissionQuery({
                userId: userid,
                recordId: id,
                tableName,
                operation
            })
            

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