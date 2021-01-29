const Joi = require('joi');
const dependencyInjector = require('../dependency-injector');
const permissionModel = dependencyInjector.inject('permissionModel');
const permissionService = dependencyInjector.inject('permissionService');

function hasPermission(permissionName){
    // permissionNames are declared server side, so they dont _NEED_ to be treated as hostile input, but it pays to be consistent IMO
    const validationResult = Joi.string().pattern(/^(\w+_)+(GET|POST|MODIFY|DELETE)$/).validate(permissionName);
    if(validationResult.error){
        throw new Error('Improper permissionName formatting.');
    }
    
    let permissionId;
    
    return async function(req, res, next){
        try{
            if(!permissionId){
                const permissionNeededQuery = await permissionModel.getPermissions(
                    {limit:1, offset: 0},
                    'id',
                    {name: permissionName}
                );

                if(!permissionNeededQuery.length){
                    throw new Error('Permission not found');
                }
            
                permissionId = permissionNeededQuery[0].id;
            }
            // this needs to be updated whenever the module is installed
            const {userid} = req.headers;

            const hasPermission = await permissionService.runPermissionQuery({
                userId: userid,
                permissionId
            })

            if(!hasPermission){
                throw new Error('User doesn\'t have permission to perform this action');
            }

            next();
        }
        catch(e){
            next(e);
        }
    }
}

module.exports = hasPermission;