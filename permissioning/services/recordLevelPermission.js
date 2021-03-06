
    const dependencyInjector = require('../dependency-injector.js');
    const recordLevelPermissionModel = dependencyInjector.inject('recordLevelPermissionModel');

    const Joi = require('joi');

    const standardLogger = require('../logger');

    async function getRecordLevelPermissions(validationResult){
        const paginationData = {limit, offset} = validationResult.value;
        const fieldData = validationResult.value.fields;
        
        const queryObject = {...validationResult.value};
        delete queryObject.limit;
        delete queryObject.offset;
        delete queryObject.fields;

        return {status: 200, body: await recordLevelPermissionModel.getRecordLevelPermissions(paginationData, fieldData, queryObject)}
    }

    async function getSpecificRecordLevelPermission(recordLevelPermissionId, fieldData){
        return {status: 200, body: await recordLevelPermissionModel.getSpecificRecordLevelPermission(recordLevelPermissionId, fieldData)}
    }

    async function postRecordLevelPermission(recordLevelPermissionData){
        return {status: 200, body: await recordLevelPermissionModel.postRecordLevelPermission(recordLevelPermissionData)}
    }

    async function updateRecordLevelPermissions(recordLevelPermissionDataArray){
        await recordLevelPermissionModel.updateRecordLevelPermissions(recordLevelPermissionDataArray)
        return {status: 200, body: {message: 'RecordLevelPermissions updated successfully'}}
    }

    async function updateSpecificRecordLevelPermission(recordLevelPermissionData){
        await recordLevelPermissionModel.updateSpecificRecordLevelPermission(recordLevelPermissionData)
        return {status: 200, body: {message: 'RecordLevelPermission updated successfully'}}
    }

    async function patchRecordLevelPermissions(recordLevelPermissionDataArray){
        await recordLevelPermissionModel.patchRecordLevelPermissions(recordLevelPermissionDataArray)
        return {status: 200, body: {message: 'RecordLevelPermissions patched successfully'}}
    }

    async function patchSpecificRecordLevelPermission(id, recordLevelPermissionData){
        await recordLevelPermissionModel.patchSpecificRecordLevelPermission(id, recordLevelPermissionData)
        return {status: 200, body: {message: 'RecordLevelPermission patched successfully'}}
    }

    async function deleteRecordLevelPermissions(recordLevelPermissionIdList){
        await recordLevelPermissionModel.deleteRecordLevelPermissions(recordLevelPermissionIdList)
        return {status: 200, body: {message: 'RecordLevelPermissions deleted successfully'}}
    }

    async function deleteSpecificRecordLevelPermission(recordLevelPermissionId){
        await recordLevelPermissionModel.deleteSpecificRecordLevelPermission(recordLevelPermissionId)
        return {status: 200, body: {message: 'RecordLevelPermission deleted successfully'}}
    }

    async function runRecordLevelPermissionQuery(queryObject){
        const validateRecordLevelPermisionQueryObject = Joi.object({
            userId: Joi.string().required(),
            recordId: Joi.number().integer().required(),
            tableName: Joi.string().required(),
            operation: Joi.alternatives().try('get', 'modify', 'del')
        });

        const validationResult = validateRecordLevelPermisionQueryObject.validate(queryObject);

        if(validationResult.error){
            throw new Error(validationResult.error);
        }

        const {userId, recordId, tableName, operation} = validationResult.value;
        return await recordLevelPermissionModel.runRecordLevelPermissionQuery(userId, recordId, tableName, operation)
    }

    module.exports = {
        getRecordLevelPermissions,
        getSpecificRecordLevelPermission,
        postRecordLevelPermission,
        updateRecordLevelPermissions,
        updateSpecificRecordLevelPermission,
        patchRecordLevelPermissions,
        patchSpecificRecordLevelPermission,
        deleteRecordLevelPermissions,
        deleteSpecificRecordLevelPermission,

        runRecordLevelPermissionQuery
    }
    