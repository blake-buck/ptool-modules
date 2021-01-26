const Joi = require('joi');
const dependencyInjector = require('../dependency-injector');
const permissionGroupToUserModel = dependencyInjector.inject('permissionGroupToUserModel');
const permissionGroupToPermissionModel = dependencyInjector.inject('permissionGroupToPermissionModel');
const permissionModel = dependencyInjector.inject('permissionModel');

function hasPermission(permissionNameOrId){
    // permissionNames are declared server side, so they dont _NEED_ to be treated as hostile input, but it pays to be consistent IMO
    const validationResult = Joi.alternatives().try(
        Joi.string().pattern(/^(\w+_)+(READ|WRITE|UPDATE|DELETE)$/),
        Joi.number().integer().positive()
    ).validate(permissionNameOrId);
    if(validationResult.error){
        throw new Error('Improper permissionNameOrId formatting.');
    }

    return function(req, res, next){
        
        next();
    }
}