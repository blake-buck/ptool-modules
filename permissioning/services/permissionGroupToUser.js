
    const dependencyInjector = require('../dependency-injector.js');
    const permissionGroupToUserModel = dependencyInjector.inject('permissionGroupToUserModel');

    const standardLogger = require('../logger');

    async function getPermissionGroupToUsers(paginationData, fieldData){
        return {status: 200, body: await permissionGroupToUserModel.getPermissionGroupToUsers(paginationData, fieldData)}
    }

    async function getSpecificPermissionGroupToUser(permissionGroupToUserId, fieldData){
        return {status: 200, body: await permissionGroupToUserModel.getSpecificPermissionGroupToUser(permissionGroupToUserId, fieldData)}
    }

    async function postPermissionGroupToUser(permissionGroupToUserData){
        return {status: 200, body: await permissionGroupToUserModel.postPermissionGroupToUser(permissionGroupToUserData)}
    }

    async function updatePermissionGroupToUsers(permissionGroupToUserDataArray){
        await permissionGroupToUserModel.updatePermissionGroupToUsers(permissionGroupToUserDataArray)
        return {status: 200, body: {message: 'PermissionGroupToUsers updated successfully'}}
    }

    async function updateSpecificPermissionGroupToUser(permissionGroupToUserData){
        await permissionGroupToUserModel.updateSpecificPermissionGroupToUser(permissionGroupToUserData)
        return {status: 200, body: {message: 'PermissionGroupToUser updated successfully'}}
    }

    async function patchPermissionGroupToUsers(permissionGroupToUserDataArray){
        await permissionGroupToUserModel.patchPermissionGroupToUsers(permissionGroupToUserDataArray)
        return {status: 200, body: {message: 'PermissionGroupToUsers patched successfully'}}
    }

    async function patchSpecificPermissionGroupToUser(id, permissionGroupToUserData){
        await permissionGroupToUserModel.patchSpecificPermissionGroupToUser(id, permissionGroupToUserData)
        return {status: 200, body: {message: 'PermissionGroupToUser patched successfully'}}
    }

    async function deletePermissionGroupToUsers(permissionGroupToUserIdList){
        await permissionGroupToUserModel.deletePermissionGroupToUsers(permissionGroupToUserIdList)
        return {status: 200, body: {message: 'PermissionGroupToUsers deleted successfully'}}
    }

    async function deleteSpecificPermissionGroupToUser(permissionGroupToUserId){
        await permissionGroupToUserModel.deleteSpecificPermissionGroupToUser(permissionGroupToUserId)
        return {status: 200, body: {message: 'PermissionGroupToUser deleted successfully'}}
    }

    module.exports = {
        getPermissionGroupToUsers,
        getSpecificPermissionGroupToUser,
        postPermissionGroupToUser,
        updatePermissionGroupToUsers,
        updateSpecificPermissionGroupToUser,
        patchPermissionGroupToUsers,
        patchSpecificPermissionGroupToUser,
        deletePermissionGroupToUsers,
        deleteSpecificPermissionGroupToUser
    }
    