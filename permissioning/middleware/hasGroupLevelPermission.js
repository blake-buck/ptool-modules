const Joi = require('joi');
const dependencyInjector = require('../dependency-injector');
const groupLevelPermissionService = dependencyInjector.inject('groupLevelPermissionService');

const {UnAuthorizedRequestError} = require('../constants/errors')

function hasGroupLevelPermission(tableName, operation){
    const operationValidation = Joi.alternatives().try('post').validate(operation);
    if(operationValidation.error){
        throw new Error('Improper operation value passed into hasRecordLevelPermission. Must be post.')
    }

    return async function(req, res, next){
        try{
            const {userid} = req.headers;
            let groupId = req.body.groupId;
            
            const hasPermission = await groupLevelPermissionService.runGroupLevelPermissionQuery({
                userId:userid, 
                groupId, 
                tableName, 
                operation
            });
            if(!hasPermission){
                throw new UnAuthorizedRequestError('User does not have permission to perform action at the group level.');
            }
            next();
        }
        catch(e){
            next(e);
        }
    }
}

module.exports = hasGroupLevelPermission;