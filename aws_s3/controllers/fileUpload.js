const Joi = require('joi');
const controllerWrapper = require('./controllerWrapper.js');
const dependencyInjector = require('../dependency-injector');
const fileUploadService = dependencyInjector.inject('fileUploadService');


async function listBuckets(request, response){
    const {status, body} = await fileUploadService.listBuckets();
    response.status(status).json(body);
}

async function getBucket(){

}

async function createBucket(){

}

async function putBucket(){

}

async function deleteBucket(){

}

async function listObjectsInBucket(){

}

async function getObject(){
    
}

async function putObject(){

}

async function deleteObject(){

}

module.exports = {
    listBuckets: controllerWrapper(listBuckets),
    getBucket: controllerWrapper(getBucket),
    createBucket: controllerWrapper(createBucket),
    putBucket: controllerWrapper(putBucket),
    deleteBucket: controllerWrapper(deleteBucket),
    listObjectsInBucket: controllerWrapper(listObjectsInBucket),
    getObject: controllerWrapper(getObject),
    putObject: controllerWrapper(putObject),
    deleteObject: controllerWrapper(deleteObject)
}