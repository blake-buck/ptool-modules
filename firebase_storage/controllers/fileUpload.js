const controllerWrapper = require('./controllerWrapper.js');
const dependencyInjector = require('../dependency-injector');
const fileUploadService = dependencyInjector.inject('fileUploadService');


async function listFiles(request, response){
    const result = await fileUploadService.listFiles(request.query);
    response.status(200).json(result);
}

async function getFile(request, response){
    const result = await fileUploadService.getFile(request.params);
    response.status(200).json(result);
}

async function putFile(request, response){
    const result = await fileUploadService.putFile({
        ...request.params,
        ...request.body
    });
    response.status(200).json({message:'File successfully written'});
}

async function deleteFile(request, response){
    const result = await fileUploadService.deleteFile(request.params);
    response.status(200).json({message:'File successfully deleted'});
}

async function deleteFilesBulk(request, response){
    const result = await fileUploadService.deleteFilesBulk({
        ...request.params,
        ...request.body
    });
    response.status(200).json({message:'Files successfully deleted'});
}

async function getPresignedUrlForObjectGet(request, response){
    const result = await fileUploadService.getPresignedUrlForObjectGet({
        ...request.params,
        ...request.query
    });
    response.status(200).json({url: result});
}

async function getPresignedUrlForObjectPut(request, response){
    const result = await fileUploadService.getPresignedUrlForObjectPut({
        ...request.params,
        ...request.query
    });
    response.status(200).json({url: result});
}

async function getPresignedUrlForObjectDelete(request, response){
    const result = await fileUploadService.getPresignedUrlForObjectDelete({
        ...request.params,
        ...request.query
    });
    response.status(200).json({url: result});
}

module.exports = {
    listFiles: controllerWrapper(listFiles),
    getFile: controllerWrapper(getFile),
    putFile: controllerWrapper(putFile),
    deleteFile: controllerWrapper(deleteFile),
    deleteFilesBulk: controllerWrapper(deleteFilesBulk),
    getPresignedUrlForObjectGet: controllerWrapper(getPresignedUrlForObjectGet),
    getPresignedUrlForObjectPut: controllerWrapper(getPresignedUrlForObjectPut),
    getPresignedUrlForObjectDelete: controllerWrapper(getPresignedUrlForObjectDelete)
}