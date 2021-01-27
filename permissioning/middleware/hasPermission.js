const Joi = require('joi');
const dependencyInjector = require('../dependency-injector');
const permissionGroupToUserModel = dependencyInjector.inject('permissionGroupToUserModel');
const permissionGroupToPermissionModel = dependencyInjector.inject('permissionGroupToPermissionModel');
const permissionModel = dependencyInjector.inject('permissionModel');

async function hasPermission(permissionName){
    // permissionNames are declared server side, so they dont _NEED_ to be treated as hostile input, but it pays to be consistent IMO
    const validationResult = Joi.string().pattern(/^(\w+_)+(GET|POST|UPDATE|DELETE)$/).validate(permissionName);
    if(validationResult.error){
        throw new Error('Improper permissionName formatting.');
    }
    const permissionNeededQuery = await permissionModel.getPermissions(
        {limit:1, offset: 0},
        'id',
        {name: permissionName}
    )
    if(!permissionNeededQuery.length){
        throw new Error('Permission not found');
    }

    const permissionId = permissionNeededQuery[0].name;

    return async function(req, res, next){
        // this needs to be updated whenever the module is installed
        const {userId} = req.headers;

        // get all the groups the user is a part of 
        const userGroups = await permissionGroupToUserModel.getPermissionGroupToUsers(
            // would be a good place to implement an "unlimited limit feature"
            // that or automatic pagination
            {limit: 1000, offset:0}, 
            'groupId',
            {userId: userId}
        ).map(result => result.groupId).join(',');

        // check if any of the groups have permission to perform said action
        const permissionMatch = await permissionGroupToPermissionModel.getPermissionGroupToPermissions(
            {limit: 1, offset: 0},
            'permissionId',
            {
                groupId:{
                    in: userGroups
                },
                permissionId
            }
        );

        if(!permissionMatch.length){
            return next(new Error('User does not have permission to perform action.'))
        }

        return next();
    }
}

module.exports = hasPermission;