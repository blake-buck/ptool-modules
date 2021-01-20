const models = require('../models/example');
const standardLogger = require('../logger');

async function getExamples(paginationData, fieldData){
    return {status: 200, body: await models.getExamples(paginationData, fieldData)}
}

async function getSpecificExample(exampleId, fieldData){
    const result = await models.getSpecificExample(exampleId, fieldData);
    if(!result){
        throw new Error('Specific example record not found.')
    }
    return {status: 200, body: result}
}

async function postExample(exampleData){
    return {status: 200, body: await models.postExample(exampleData)}
}

async function updateExamples(exampleDataArray){
    await models.updateExamples(exampleDataArray)
    return {status: 200, body: {message: 'Examples updated successfully'}}
}

async function updateSpecificExample(exampleData){
    await models.updateSpecificExample(exampleData)
    return {status: 200, body: {message: 'Example updated successfully'}}
}

async function patchExamples(exampleData){
    await models.patchExamples(exampleData);
    return {status:200, body: {message: 'Examples patched successfully'}}
}

async function patchSpecificExample(exampleId, exampleData){
    await models.patchSpecificExample(exampleId, exampleData);
    return {status: 200, body: {message:'Example patched successfully'}}
}

async function deleteExamples(exampleIdList){
    await models.deleteExamples(exampleIdList)
    return {status: 200, body: {message: 'Examples deleted successfully'}}
}

async function deleteSpecificExample(exampleId){
    await models.deleteSpecificExample(exampleId)
    return {status: 200, body: {message: 'Example deleted successfully'}}
}

module.exports = {
    getExamples,
    getSpecificExample,
    postExample,
    updateExamples,
    updateSpecificExample,
    patchExamples,
    patchSpecificExample,
    deleteExamples,
    deleteSpecificExample
}