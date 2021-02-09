const Joi = require('joi');
const {BadRequestError} = require('../constants/errors');
const controllerWrapper = require('./controllerWrapper.js.js');
const dependencyInjector = require('../dependency-injector');
const fileUploadService = dependencyInjector.inject('fileUploadService');


async function listBuckets(request, response){
    const {status, body} = await fileUploadService.listBuckets();
    response.status(status).json(body);
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
const listObjectsInBucketQueryValidation = Joi.object({
    limit: Joi.number().integer().positive(),
    startAfter: Joi.string(),
    prefix: Joi.string()
});
async function listObjectsInBucket(request, response){
    const validationResult = listObjectsInBucketParameterValidation.validate(request.params);
    if(validationResult.error){
        throw new BadRequestError(validationResult.error);
    }

    const queryValidationResult = listObjectsInBucketQueryValidation.validate(request.query);
    if(queryValidationResult.error){
        throw new BadRequestError(validationResult.error);
    }

    const {status, body} = await fileUploadService.listObjectsInBucket(
        {
            ...validationResult.value,
            ...queryValidationResult.value
        }
    );
    response.status(status).json(body);
}

const getObjectParameterValidation = Joi.object({
    bucketId: Joi.string(),
    objectKey: Joi.string() 
});
async function getObject(request, response){
    const validationResult = getObjectParameterValidation.validate(request.params);
    if(validationResult.error){
        throw new BadRequestError(validationResult.error);
    }

    const {status, body} = await fileUploadService.getObject(validationResult.value);
    response.status(status).json(body);
}

const putObjectParameterValidation = Joi.object({
    bucketId: Joi.string(),
    objectKey: Joi.string(),
});
const putObjectBodyValidation = Joi.object({
    base64: Joi.string().base64()
})
async function putObject(request, response){
    const parameterValidationResult = putObjectParameterValidation.validate(request.params);
    if(parameterValidationResult.error){
        throw new BadRequestError(parameterValidationResult.error);
    }

    const bodyValidationResult = putObjectBodyValidation.validate(request.body);
    if(bodyValidationResult.error){
        throw new BadRequestError(bodyValidation.error);
    }

    const {status, body} = await fileUploadService.putObject({
        ...parameterValidationResult.value,
        ...bodyValidationResult.value
    })

    response.status(status).json(body);
}

const deleteObjectParameterValidation = Joi.object({
    bucketId: Joi.string(),
    objectKey: Joi.string(),
});
async function deleteObject(request, response){
    const parameterValidationResult = deleteObjectParameterValidation.validate(request.params);
    if(parameterValidationResult.error){
        throw new BadRequestError(parameterValidationResult.error);
    }

    const {status, body} = await fileUploadService.deleteObject(parameterValidationResult.value);

    response.status(status).json(body);
}

const deleteObjectsBulkParameterValidation = Joi.object({
    bucketId: Joi.string()
})
const deleteObjectsBulkBodyValidation = Joi.object({
    objectKeysToDelete: Joi.array().items(Joi.string())
})
async function deleteObjectsBulk(request, response){
    const paramValidation = deleteObjectsBulkParameterValidation.validate(request.params);
    if(paramValidation.error){
        throw new BadRequestError(paramValidation.error);
    }

    const bodyValidation = deleteObjectsBulkBodyValidation.validate(request.body);
    if(bodyValidation.error){
        throw new BadRequestError(bodyValidation.error);
    }

    const {status, body} = await fileUploadService.deleteObjectsBulk({
        ...paramValidation.value,
        ...bodyValidation.value
    });

    response.status(status).json(body);
}

const getPresignedUrlForObjectGetParameterValidation = Joi.object({
    bucketId: Joi.string(),
    objectKey: Joi.string()
});
const getPresignedUrlForObjectGetQueryValidation = Joi.object({
    expiration: Joi.number().integer().positive()
})
async function getPresignedUrlForObjectGet(request, response){
    const parameterValidationResult = getPresignedUrlForObjectGetParameterValidation.validate(request.params);
    if(parameterValidationResult.error){
        throw new BadRequestError(parameterValidationResult.error);
    }

    const queryValidationResult = getPresignedUrlForObjectGetQueryValidation.validate(request.query);
    if(queryValidationResult.error){
        throw new BadRequestError(queryValidationResult.error);
    }

    const {status, body} = await fileUploadService.getPresignedUrlForObjectGet({
        ...parameterValidationResult.value,
        ...queryValidationResult.value
    });

    response.status(status).json(body);
}

const getPresignedUrlForObjectPutParameterValidation = Joi.object({
    bucketId: Joi.string(),
    objectKey: Joi.string()
});
const getPresignedUrlForObjectPutQueryValidation = Joi.object({
    expiration: Joi.number().integer().positive()
});
async function getPresignedUrlForObjectPut(request, response){
    const paramValidation = getPresignedUrlForObjectPutParameterValidation.validate(request.params);
    if(paramValidation.error){
        throw new BadRequestError(paramValidation.error);
    }

    const queryValidation = getPresignedUrlForObjectPutQueryValidation.validate(request.query);
    if(queryValidation.error){
        throw new BadRequestError(queryValidation.error);
    }

    const {status, body} = await fileUploadService.getPresignedUrlForObjectPut({
        ...paramValidation.value,
        ...queryValidation.value
    });

    response.status(status).json(body);
}

const getPresignedUrlForObjectDeleteParameterValidation = Joi.object({
    bucketId: Joi.string(),
    objectKey: Joi.string()
});
async function getPresignedUrlForObjectDelete(request, response){
    const parameterValidation = getPresignedUrlForObjectDeleteParameterValidation.validate(request.params);
    if(parameterValidation.error){
        throw new BadRequestError(parameterValidation.error);
    }

    const {status, body} = await fileUploadService.getPresignedUrlForObjectDelete(parameterValidation.value);

    response.status(status).json(body);
}

module.exports = {
    listBuckets: controllerWrapper(listBuckets),
    createBucket: controllerWrapper(createBucket),
    deleteBucket: controllerWrapper(deleteBucket),
    listObjectsInBucket: controllerWrapper(listObjectsInBucket),
    getObject: controllerWrapper(getObject),
    putObject: controllerWrapper(putObject),
    deleteObject: controllerWrapper(deleteObject),
    deleteObjectsBulk: controllerWrapper(deleteObjectsBulk),
    getPresignedUrlForObjectGet: controllerWrapper(getPresignedUrlForObjectGet),
    getPresignedUrlForObjectPut: controllerWrapper(getPresignedUrlForObjectPut),
    getPresignedUrlForObjectDelete: controllerWrapper(getPresignedUrlForObjectDelete)
}