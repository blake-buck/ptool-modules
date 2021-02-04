
    const dependencyInjector = require('../dependency-injector.js');
    const logModel = dependencyInjector.inject('logModel');

    const standardLogger = require('../logger');

    async function getLogCount(validationResult){
        return {status: 200, body: {count: await logModel.getLogCount(validationResult.value)}}
    }

    async function getLogs(validationResult){
        const paginationData = {limit, offset} = validationResult.value;
        const fieldData = validationResult.value.fields;
        
        const queryObject = {...validationResult.value};
        delete queryObject.limit;
        delete queryObject.offset;
        delete queryObject.fields;

        return {status: 200, body: await logModel.getLogs(paginationData, fieldData, queryObject)}
    }

    async function getSpecificLog(logId, fieldData){
        return {status: 200, body: await logModel.getSpecificLog(logId, fieldData)}
    }

    module.exports = {
        getLogCount,
        getLogs,
        getSpecificLog
    }
    