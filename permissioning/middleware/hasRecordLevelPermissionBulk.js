const Joi = require('joi');
const dependencyInjector = require('../dependency-injector');
const recordLevelPermissionService = dependencyInjector.inject('recordLevelPermissionService');


function hasRecordLevelPermission(tableName, operation){
    const operationValidation = Joi.alternatives().try('get', 'update', 'del').validate(operation);
    if(operationValidation.error){
        throw new Error('Improper operation value passed into hasRecordLevelPermission. Must be get, update, or del.')
    }

    return async function(req, res, next){
        try{
            const {userId} = req.headers;

            const queryResults = await Promise.all(
                req.body.map(record => {
                    return recordLevelPermissionService.runRecordLevelPermissionQuery({
                        userId,
                        recordId: record.id,
                        tableName,
                        operation
                    });
                })
            );
            
            const hasPermission = queryResults.every((value) => value);
            
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