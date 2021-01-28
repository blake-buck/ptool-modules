const dependencyInjector = require('../dependency-injector');
const groupLevelPermissionService = dependencyInjector.inject('groupLevelPermissionService');

function hasGroupLevelPermission(tableName, operation){
    const operationValidation = Joi.alternatives().try('get', 'post').validate(operation);
    if(operationValidation.error){
        throw new Error('Improper operation value passed into hasRecordLevelPermission. Must be get or post.')
    }

    return async function(req, res, next){
        try{
            const {userId} = req.headers;
            let groupId;
            if(operation === 'get'){
                
            }
            if(operation === 'post'){
                const {groupId} = req.body;
                this.groupId = groupId;
            }

            const hasPermission = await groupLevelPermissionService.runGroupLevelPermissionQuery({
                userId, 
                groupId, 
                tableName, 
                operation
            });
            if(!hasPermission){
                throw new Error('User does not have permission to perform action.');
            }
            next();
        }
        catch(e){
            next(e);
        }
    }
}

module.exports = hasGroupLevelPermission;