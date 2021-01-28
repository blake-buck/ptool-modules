
    const dependencyInjector = require('../dependency-injector.js');
    const groupLevelPermissionModel = dependencyInjector.inject('groupLevelPermissionModel');

    const standardLogger = require('../logger');

    async function getGroupLevelPermissions(validationResult){
        const paginationData = {limit, offset} = validationResult.value;
        const fieldData = validationResult.value.fields;
        
        const queryObject = {...validationResult.value};
        delete queryObject.limit;
        delete queryObject.offset;
        delete queryObject.fields;

        return {status: 200, body: await groupLevelPermissionModel.getGroupLevelPermissions(paginationData, fieldData, queryObject)}
    }

    async function getSpecificGroupLevelPermission(groupLevelPermissionId, fieldData){
        return {status: 200, body: await groupLevelPermissionModel.getSpecificGroupLevelPermission(groupLevelPermissionId, fieldData)}
    }

    async function postGroupLevelPermission(groupLevelPermissionData){
        return {status: 200, body: await groupLevelPermissionModel.postGroupLevelPermission(groupLevelPermissionData)}
    }

    async function updateGroupLevelPermissions(groupLevelPermissionDataArray){
        await groupLevelPermissionModel.updateGroupLevelPermissions(groupLevelPermissionDataArray)
        return {status: 200, body: {message: 'GroupLevelPermissions updated successfully'}}
    }

    async function updateSpecificGroupLevelPermission(groupLevelPermissionData){
        await groupLevelPermissionModel.updateSpecificGroupLevelPermission(groupLevelPermissionData)
        return {status: 200, body: {message: 'GroupLevelPermission updated successfully'}}
    }

    async function patchGroupLevelPermissions(groupLevelPermissionDataArray){
        await groupLevelPermissionModel.patchGroupLevelPermissions(groupLevelPermissionDataArray)
        return {status: 200, body: {message: 'GroupLevelPermissions patched successfully'}}
    }

    async function patchSpecificGroupLevelPermission(id, groupLevelPermissionData){
        await groupLevelPermissionModel.patchSpecificGroupLevelPermission(id, groupLevelPermissionData)
        return {status: 200, body: {message: 'GroupLevelPermission patched successfully'}}
    }

    async function deleteGroupLevelPermissions(groupLevelPermissionIdList){
        await groupLevelPermissionModel.deleteGroupLevelPermissions(groupLevelPermissionIdList)
        return {status: 200, body: {message: 'GroupLevelPermissions deleted successfully'}}
    }

    async function deleteSpecificGroupLevelPermission(groupLevelPermissionId){
        await groupLevelPermissionModel.deleteSpecificGroupLevelPermission(groupLevelPermissionId)
        return {status: 200, body: {message: 'GroupLevelPermission deleted successfully'}}
    }

    module.exports = {
        getGroupLevelPermissions,
        getSpecificGroupLevelPermission,
        postGroupLevelPermission,
        updateGroupLevelPermissions,
        updateSpecificGroupLevelPermission,
        patchGroupLevelPermissions,
        patchSpecificGroupLevelPermission,
        deleteGroupLevelPermissions,
        deleteSpecificGroupLevelPermission
    }
    