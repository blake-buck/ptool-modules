const dependencyInjector = require('../dependency-injector.js');
const exampleModel = dependencyInjector.inject('exampleModel');
const standardLogger = require('../logger');

async function getExamples(paginationData, fieldData){
    return {status: 200, body: await exampleModel.getExamples(paginationData, fieldData)}
}

async function getSpecificExample(exampleId, fieldData){
    const result = await exampleModel.getSpecificExample(exampleId, fieldData);
    if(!result){
        throw new Error('Specific example record not found.')
    }
    return {status: 200, body: result}
}

async function postExample(exampleData){
    return {status: 200, body: await exampleModel.postExample(exampleData)}
}

async function updateExamples(exampleDataArray){
    await exampleModel.updateExamples(exampleDataArray)
    return {status: 200, body: {message: 'Examples updated successfully'}}
}

async function updateSpecificExample(exampleData){
    await exampleModel.updateSpecificExample(exampleData)
    return {status: 200, body: {message: 'Example updated successfully'}}
}

async function patchExamples(exampleData){
    await exampleModel.patchExamples(exampleData);
    return {status:200, body: {message: 'Examples patched successfully'}}
}

async function patchSpecificExample(exampleId, exampleData){
    await exampleModel.patchSpecificExample(exampleId, exampleData);
    return {status: 200, body: {message:'Example patched successfully'}}
}

async function deleteExamples(exampleIdList){
    await exampleModel.deleteExamples(exampleIdList)
    return {status: 200, body: {message: 'Examples deleted successfully'}}
}

async function deleteSpecificExample(exampleId){
    await exampleModel.deleteSpecificExample(exampleId)
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