
    const dependencyInjector = require('../dependency-injector.js');
    const permissionModel = dependencyInjector.inject('permissionModel');

    const Joi = require('joi');

    const standardLogger = require('../logger');

    async function getPermissions(validationResult){
        const paginationData = {limit, offset} = validationResult.value;
        const fieldData = validationResult.value.fields;
        
        const queryObject = {...validationResult.value};
        delete queryObject.limit;
        delete queryObject.offset;
        delete queryObject.fields;

        return {status: 200, body: await permissionModel.getPermissions(paginationData, fieldData, queryObject)}
    }

    async function getSpecificPermission(permissionId, fieldData){
        return {status: 200, body: await permissionModel.getSpecificPermission(permissionId, fieldData)}
    }

    async function postPermission(permissionData){
        return {status: 200, body: await permissionModel.postPermission(permissionData)}
    }

    async function updatePermissions(permissionDataArray){
        await permissionModel.updatePermissions(permissionDataArray)
        return {status: 200, body: {message: 'Permissions updated successfully'}}
    }

    async function updateSpecificPermission(permissionData){
        await permissionModel.updateSpecificPermission(permissionData)
        return {status: 200, body: {message: 'Permission updated successfully'}}
    }

    async function patchPermissions(permissionDataArray){
        await permissionModel.patchPermissions(permissionDataArray)
        return {status: 200, body: {message: 'Permissions patched successfully'}}
    }

    async function patchSpecificPermission(id, permissionData){
        await permissionModel.patchSpecificPermission(id, permissionData)
        return {status: 200, body: {message: 'Permission patched successfully'}}
    }

    async function deletePermissions(permissionIdList){
        await permissionModel.deletePermissions(permissionIdList)
        return {status: 200, body: {message: 'Permissions deleted successfully'}}
    }

    async function deleteSpecificPermission(permissionId){
        await permissionModel.deleteSpecificPermission(permissionId)
        return {status: 200, body: {message: 'Permission deleted successfully'}}
    }

    async function runPermissionQuery(queryObj){
        const validatePermissionQueryObject = Joi.object({
            userId: Joi.string().required(),
            permissionId: Joi.integer().required()
        });

        const validationResult = validatePermissionQueryObject.validate(queryObj);
        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const {userId, permissionId} = validationResult.value;

        return await permissionModel.runPermissionQuery()
    }

    module.exports = {
        getPermissions,
        getSpecificPermission,
        postPermission,
        updatePermissions,
        updateSpecificPermission,
        patchPermissions,
        patchSpecificPermission,
        deletePermissions,
        deleteSpecificPermission,
        runPermissionQuery
    }
    