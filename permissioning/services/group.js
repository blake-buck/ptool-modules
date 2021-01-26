
    const dependencyInjector = require('../dependency-injector.js');
    const groupModel = dependencyInjector.inject('groupModel');

    const standardLogger = require('../logger');

    async function getGroups(paginationData, fieldData, remainingQueryData){
        return {status: 200, body: await groupModel.getGroups(paginationData, fieldData, remainingQueryData)}
    }

    async function getSpecificGroup(groupId, fieldData){
        return {status: 200, body: await groupModel.getSpecificGroup(groupId, fieldData)}
    }

    async function postGroup(groupData){
        return {status: 200, body: await groupModel.postGroup(groupData)}
    }

    async function updateGroups(groupDataArray){
        await groupModel.updateGroups(groupDataArray)
        return {status: 200, body: {message: 'Groups updated successfully'}}
    }

    async function updateSpecificGroup(groupData){
        await groupModel.updateSpecificGroup(groupData)
        return {status: 200, body: {message: 'Group updated successfully'}}
    }

    async function patchGroups(groupDataArray){
        await groupModel.patchGroups(groupDataArray)
        return {status: 200, body: {message: 'Groups patched successfully'}}
    }

    async function patchSpecificGroup(id, groupData){
        await groupModel.patchSpecificGroup(id, groupData)
        return {status: 200, body: {message: 'Group patched successfully'}}
    }

    async function deleteGroups(groupIdList){
        await groupModel.deleteGroups(groupIdList)
        return {status: 200, body: {message: 'Groups deleted successfully'}}
    }

    async function deleteSpecificGroup(groupId){
        await groupModel.deleteSpecificGroup(groupId)
        return {status: 200, body: {message: 'Group deleted successfully'}}
    }

    module.exports = {
        getGroups,
        getSpecificGroup,
        postGroup,
        updateGroups,
        updateSpecificGroup,
        patchGroups,
        patchSpecificGroup,
        deleteGroups,
        deleteSpecificGroup
    }
    