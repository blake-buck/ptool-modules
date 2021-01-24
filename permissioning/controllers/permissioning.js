const Joi = require('joi');
const controllerWrapper = require('./controllerWrapper.js');

const permissioningService = require('../services/permissioning');

const idParametersSchema = Joi.object({
    id: Joi.number()
})

const getPermissionsSchema = Joi.object({})
function getPermissions(request, response){

}

const postPermissionSchema = Joi.object({});
function postPermission(request, response){

}

const putPermissionsSchema = Joi.object({});
function putPermissions(request, response){

}

const deletePermissionsSchema = Joi.object({});
function deletePermissions(request, response){

}

const getSpecificPermissionSchema = Joi.object({});
function getSpecificPermission(request, response){
    const headerValidation = idParametersSchema.validate(request.headers);
    if(headerValidation.error){
        throw new Error(headerValidation.error);
    }
}

const putSpecificPermissionSchema = Joi.object({});
function putSpecificPermission(request, response){
    const headerValidation = idParametersSchema.validate(request.headers);
    if(headerValidation.error){
        throw new Error(headerValidation.error);
    }

}

const deleteSpecificPermissionSchema = Joi.object({});
function deleteSpecificPermission(request, response){
    const headerValidation = idParametersSchema.validate(request.headers);
    if(headerValidation.error){
        throw new Error(headerValidation.error);
    }

}

const getPermissionGroupsSchema = Joi.object({});
function getPermissionGroups(request, response){

}

const postPermissionGroupSchema = Joi.object({});
function postPermissionGroup(request, response){

}

const putPermissionGroupsSchema = Joi.object({});
function putPermissionGroups(request, response){

}

const deletePermissionGroupsSchema = Joi.object({});
function deletePermissionGroups(request, response){

}

const getSpecificPermissionGroupSchema = Joi.object({});
function getSpecificPermissionGroup(request, response){
    const headerValidation = idParametersSchema.validate(request.headers);
    if(headerValidation.error){
        throw new Error(headerValidation.error);
    }

}

const putSpecificPermissionGroupSchema = Joi.object({});
function putSpecificPermissionGroup(request, response){
    const headerValidation = idParametersSchema.validate(request.headers);
    if(headerValidation.error){
        throw new Error(headerValidation.error);
    }

}

const deleteSpecificPermissionGroupSchema = Joi.object({});
function deleteSpecificPermissionGroup(request, response){
    const headerValidation = idParametersSchema.validate(request.headers);
    if(headerValidation.error){
        throw new Error(headerValidation.error);
    }

}

const getGroupToUserLinksSchema = Joi.object({});
function getGroupToUserLinks(request, response){

}

const postGroupToUserLinkSchema = Joi.object({});
function postGroupToUserLink(request, response){

}

const putGroupToUserLinksSchema = Joi.object({});
function putGroupToUserLinks(request, response){

}

const deleteGroupToUserLinksSchema = Joi.object({});
function deleteGroupToUserLinks(request, response){

}

const getSpecificGroupToUserLinkSchema = Joi.object({});
function getSpecificGroupToUserLink(request, response){
    const headerValidation = idParametersSchema.validate(request.headers);
    if(headerValidation.error){
        throw new Error(headerValidation.error);
    }

}

const putSpecificGroupToUserLinkSchema = Joi.object({});
function putSpecificGroupToUserLink(request, response){
    const headerValidation = idParametersSchema.validate(request.headers);
    if(headerValidation.error){
        throw new Error(headerValidation.error);
    }

}

const deleteSpecificGroupToUserLinkSchema = Joi.object({});
function deleteSpecificGroupToUserLink(request, response){
    const headerValidation = idParametersSchema.validate(request.headers);
    if(headerValidation.error){
        throw new Error(headerValidation.error);
    }

}

const getGroupToPermissionLinksSchema = Joi.object({});
function getGroupToPermissionLinks(request, response){

}

const postGroupToPermissionLinkSchema = Joi.object({});
function postGroupToPermissionLink(request, response){

}

const putGroupToPermissionLinksSchema = Joi.object({});
function putGroupToPermissionLinks(request, response){

}

const deleteGroupToPermissionLinksSchema = Joi.object({});
function deleteGroupToPermissionLinks(request, response){

}

const getSpecificGroupToPermissionLinkSchema = Joi.object({});
function getSpecificGroupToPermissionLink(request, response){
    const headerValidation = idParametersSchema.validate(request.headers);
    if(headerValidation.error){
        throw new Error(headerValidation.error);
    }

}

const putSpecificGroupToPermissionLinkSchema = Joi.object({});
function putSpecificGroupToPermissionLink(request, response){
    const headerValidation = idParametersSchema.validate(request.headers);
    if(headerValidation.error){
        throw new Error(headerValidation.error);
    }

}

const deleteSpecificGroupToPermissionLinkSchema = Joi.object({});
function deleteSpecificGroupToPermissionLink(request, response){
    const headerValidation = idParametersSchema.validate(request.headers);
    if(headerValidation.error){
        throw new Error(headerValidation.error);
    }

}
module.exports = {
    getPermissions: controllerWrapper(getPermissions),
    postPermission: controllerWrapper(postPermission),
    putPermissions: controllerWrapper(putPermissions),
    deletePermissions: controllerWrapper(deletePermissions),
    getSpecificPermission: controllerWrapper(getSpecificPermission),
    putSpecificPermission: controllerWrapper(putSpecificPermission),
    deleteSpecificPermission: controllerWrapper(deleteSpecificPermission),
    getPermissionGroups: controllerWrapper(getPermissionGroups),
    postPermissionGroup: controllerWrapper(postPermissionGroup),
    putPermissionGroups: controllerWrapper(putPermissionGroups),
    deletePermissionGroups: controllerWrapper(deletePermissionGroups),
    getSpecificPermissionGroup: controllerWrapper(getSpecificPermissionGroup),
    getSpecificPermissionGroup: controllerWrapper(putSpecificPermissionGroup),
    getSpecificPermissionGroup: controllerWrapper(deleteSpecificPermissionGroup),
    getGroupToUserLinks: controllerWrapper(getGroupToUserLinks),
    postGroupToUserLink: controllerWrapper(postGroupToUserLink),
    putGroupToUserLinks: controllerWrapper(putGroupToUserLinks),
    deleteGroupToUserLinks: controllerWrapper(deleteGroupToUserLinks),
    getSpecificGroupToUserLink: controllerWrapper(getSpecificGroupToUserLink),
    putSpecificGroupToUserLink: controllerWrapper(putSpecificGroupToUserLink),
    deleteSpecificGroupToUserLink: controllerWrapper(deleteSpecificGroupToUserLink),
    getGroupToPermissionLinks: controllerWrapper(getGroupToPermissionLinks),
    postGroupToPermissionLink: controllerWrapper(postGroupToPermissionLink),
    putGroupToPermissionLinks: controllerWrapper(putGroupToPermissionLinks),
    deleteGroupToPermissionLinks: controllerWrapper(deleteGroupToPermissionLinks),
    getSpecificGroupToPermissionLink: controllerWrapper(getSpecificGroupToPermissionLink),
    putSpecificGroupToPermissionLink: controllerWrapper(putSpecificGroupToPermissionLink),
    deleteSpecificGroupToPermissionLink: controllerWrapper(deleteSpecificGroupToPermissionLink),
}