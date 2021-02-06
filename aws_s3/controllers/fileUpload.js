const Joi = require('joi');
const {BadRequestError} = require('../constants/errors');
const controllerWrapper = require('./controllerWrapper.js');
const dependencyInjector = require('../dependency-injector');
const fileUploadService = dependencyInjector.inject('fileUploadService');


async function listBuckets(request, response){
    const {status, body} = await fileUploadService.listBuckets();
    response.status(status).json(body);
}

async function getBucket(){

}

const createBucketSchema = Joi.object({
    bucketId: Joi.string(),
    location: Joi.string().default('us-east-2')
})
async function createBucket(request, response){
    const validationResult = createBucketSchema.validate(request.body);
    if(validationResult.error){
        throw new BadRequestError(validationResult.error);
    }

    const {status, body} = await fileUploadService.createBucket(validationResult.value);
    response.status(status).json(body);
}

async function putBucket(){

}

const deleteBucketParameterValidation = Joi.object({bucketId: Joi.string()});
async function deleteBucket(request, response){
    const validationResult = deleteBucketParameterValidation.validate(request.params);
    if(validationResult.error){
        throw new BadRequestError(validationResult.error);
    }

    const {status, body} = await fileUploadService.deleteBucket(request.params.bucketId)

    response.status(status).json(body);
}

const listObjectsInBucketParameterValidation = Joi.object({bucketId: Joi.string()});
async function listObjectsInBucket(request, response){
    const validationResult = listObjectsInBucketParameterValidation.validate(request.params);
    if(validationResult.error){
        throw new BadRequestError(validationResult.error);
    }

    const {status, body} = await fileUploadService.listObjectsInBucket(validationResult.value);
    response.status(status).json(body);
}

async function getObject(request, response){
    
}

async function putObject(request, response){

}

async function deleteObject(request, response){

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