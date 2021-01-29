
    const dependencyInjector = require('../dependency-injector.js');
    const permissionGroupModel = dependencyInjector.inject('permissionGroupModel');

    const standardLogger = require('../logger');

    async function getPermissionGroups(validationResult){
        const paginationData = {limit, offset} = validationResult.value;
        const fieldData = validationResult.value.fields;
        
        const queryObject = {...validationResult.value};
        delete queryObject.limit;
        delete queryObject.offset;
        delete queryObject.fields;

        return {status: 200, body: await permissionGroupModel.getPermissionGroups(paginationData, fieldData, queryObject)}
    }

    async function getSpecificPermissionGroup(permissionGroupId, fieldData){
        return {status: 200, body: await permissionGroupModel.getSpecificPermissionGroup(permissionGroupId, fieldData)}
    }

    async function postPermissionGroup(permissionGroupData){
        return {status: 200, body: await permissionGroupModel.postPermissionGroup(permissionGroupData)}
    }

    async function updatePermissionGroups(permissionGroupDataArray){
        await permissionGroupModel.updatePermissionGroups(permissionGroupDataArray)
        return {status: 200, body: {message: 'PermissionGroups updated successfully'}}
    }

    async function updateSpecificPermissionGroup(permissionGroupData){
        await permissionGroupModel.updateSpecificPermissionGroup(permissionGroupData)
        return {status: 200, body: {message: 'PermissionGroup updated successfully'}}
    }

    async function patchPermissionGroups(permissionGroupDataArray){
        await permissionGroupModel.patchPermissionGroups(permissionGroupDataArray)
        return {status: 200, body: {message: 'PermissionGroups patched successfully'}}
    }

    async function patchSpecificPermissionGroup(id, permissionGroupData){
        await permissionGroupModel.patchSpecificPermissionGroup(id, permissionGroupData)
        return {status: 200, body: {message: 'PermissionGroup patched successfully'}}
    }

    async function deletePermissionGroups(permissionGroupIdList){
        await permissionGroupModel.deletePermissionGroups(permissionGroupIdList)
        return {status: 200, body: {message: 'PermissionGroups deleted successfully'}}
    }

    async function deleteSpecificPermissionGroup(permissionGroupId){
        await permissionGroupModel.deleteSpecificPermissionGroup(permissionGroupId)
        return {status: 200, body: {message: 'PermissionGroup deleted successfully'}}
    }

    module.exports = {
        getPermissionGroups,
        getSpecificPermissionGroup,
        postPermissionGroup,
        updatePermissionGroups,
        updateSpecificPermissionGroup,
        patchPermissionGroups,
        patchSpecificPermissionGroup,
        deletePermissionGroups,
        deleteSpecificPermissionGroup
    }
    