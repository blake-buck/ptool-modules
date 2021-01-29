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

            const queryResults = await Promise.all(
                req.body.map(record => {
                    let recordId;
                    if(typeof record === 'object'){
                        recordId = record.id;
                    }
                    else{
                        recordId = record;
                    }
                    return recordLevelPermissionService.runRecordLevelPermissionQuery({
                        userId:userid,
                        recordId,
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