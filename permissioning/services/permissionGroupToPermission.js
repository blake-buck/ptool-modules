
    const dependencyInjector = require('../dependency-injector.js');
    const permissionGroupToPermissionModel = dependencyInjector.inject('permissionGroupToPermissionModel');

    const standardLogger = require('../logger');

    async function getPermissionGroupToPermissions(validationResult){
        const paginationData = {limit, offset} = validationResult.value;
        const fieldData = validationResult.value.fields;
        
        const queryObject = {...validationResult.value};
        delete queryObject.limit;
        delete queryObject.offset;
        delete queryObject.fields;

        return {status: 200, body: await permissionGroupToPermissionModel.getPermissionGroupToPermissions(paginationData, fieldData, queryObject)}
    }

    async function getSpecificPermissionGroupToPermission(permissionGroupToPermissionId, fieldData){
        return {status: 200, body: await permissionGroupToPermissionModel.getSpecificPermissionGroupToPermission(permissionGroupToPermissionId, fieldData)}
    }

    async function postPermissionGroupToPermission(permissionGroupToPermissionData){
        return {status: 200, body: await permissionGroupToPermissionModel.postPermissionGroupToPermission(permissionGroupToPermissionData)}
    }

    async function updatePermissionGroupToPermissions(permissionGroupToPermissionDataArray){
        await permissionGroupToPermissionModel.updatePermissionGroupToPermissions(permissionGroupToPermissionDataArray)
        return {status: 200, body: {message: 'PermissionGroupToPermissions updated successfully'}}
    }

    async function updateSpecificPermissionGroupToPermission(permissionGroupToPermissionData){
        await permissionGroupToPermissionModel.updateSpecificPermissionGroupToPermission(permissionGroupToPermissionData)
        return {status: 200, body: {message: 'PermissionGroupToPermission updated successfully'}}
    }

    async function patchPermissionGroupToPermissions(permissionGroupToPermissionDataArray){
        await permissionGroupToPermissionModel.patchPermissionGroupToPermissions(permissionGroupToPermissionDataArray)
        return {status: 200, body: {message: 'PermissionGroupToPermissions patched successfully'}}
    }

    async function patchSpecificPermissionGroupToPermission(id, permissionGroupToPermissionData){
        await permissionGroupToPermissionModel.patchSpecificPermissionGroupToPermission(id, permissionGroupToPermissionData)
        return {status: 200, body: {message: 'PermissionGroupToPermission patched successfully'}}
    }

    async function deletePermissionGroupToPermissions(permissionGroupToPermissionIdList){
        await permissionGroupToPermissionModel.deletePermissionGroupToPermissions(permissionGroupToPermissionIdList)
        return {status: 200, body: {message: 'PermissionGroupToPermissions deleted successfully'}}
    }

    async function deleteSpecificPermissionGroupToPermission(permissionGroupToPermissionId){
        await permissionGroupToPermissionModel.deleteSpecificPermissionGroupToPermission(permissionGroupToPermissionId)
        return {status: 200, body: {message: 'PermissionGroupToPermission deleted successfully'}}
    }

    module.exports = {
        getPermissionGroupToPermissions,
        getSpecificPermissionGroupToPermission,
        postPermissionGroupToPermission,
        updatePermissionGroupToPermissions,
        updateSpecificPermissionGroupToPermission,
        patchPermissionGroupToPermissions,
        patchSpecificPermissionGroupToPermission,
        deletePermissionGroupToPermissions,
        deleteSpecificPermissionGroupToPermission
    }
    