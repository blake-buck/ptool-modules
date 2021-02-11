const Joi = require('joi');
const {BadRequestError} = require('../constants/errors');

const {Readable} = require('stream');

const dependencyInjector = require('../dependency-injector');
const firebaseStorage = dependencyInjector.inject('firebaseStorage');

const listFilesValidation = Joi.object({
    delimiter: Joi.string(),
    startOffset: Joi.string(),
    endOffset: Joi.string(),
    prefix: Joi.string(),
    maxResults: Joi.number().integer().positive()
});
async function listFiles(requestObj){
    const validationResult = listFilesValidation.validate(requestObj);
    if(validationResult.error){
        throw new BadRequestError(validationResult.error);
    }
    const {
        delimiter,
        startOffset,
        endOffset,
        prefix,
        maxResults
    } = validationResult.value;

    const result = await firebaseStorage.admin.bucket().getFiles({
        delimiter,
        startOffset,
        endOffset,
        prefix,
        maxResults
    });
    return result[0].map(file => file.name)
}

const getFileValidation = Joi.object({
    fileKey: Joi.string()
});
async function getFile(requestObj){
    const validationResult = getFileValidation.validate(requestObj);
    if(validationResult.error){
        throw new BadRequestError(validationResult.error);
    }
    const {
        fileKey
    } = validationResult.value;

    const file = await firebaseStorage.admin.bucket().file(fileKey);
    if(!file.exists()){
        throw new BadRequestError('File not found.');
    }

    return file.download();
}

const putFileValidation = Joi.object({
    fileKey: Joi.string(),
    base64: Joi.string().base64()
});
async function putFile(requestObj){
    const validationResult = putFileValidation.validate(requestObj);
    if(validationResult.error){
        throw new BadRequestError(validationResult.error);
    }
    const {
        fileKey, 
        base64
    } = validationResult.value;

    const writableStream = firebaseStorage.admin.bucket().file(fileKey).createWritableStream();
    
    return await new Promise((resolve, reject) => {
        new Readable({
            read(){
                this.push(Buffer.from(base64, 'base64'));
                this.push(null);
            }
        })
        .pipe(writableStream)
        .on('error', (err) => {
            reject(err)
        })
        .on('finish', () => {
            resolve();
        });
    })
}

const deleteFileValidation = Joi.object({
    fileKey: Joi.string()
});
async function deleteFile(requestObj){
    const validationResult = deleteFileValidation.validate(requestObj);
    if(validationResult.error){
        throw new BadRequestError(validationResult.error);
    }
    const {
        fileKey
    } = validationResult.value;

    return await firebaseStorage.admin.bucket().file(fileKey).delete();
}

const deleteFilesBulkValidation = Joi.object({
    fileKeysToDelete:Joi.array().items(Joi.string())
});
async function deleteFilesBulk(requestObj){
    const validationResult = deleteFilesBulkValidation.validate(requestObj);
    if(validationResult.error){
        throw new BadRequestError(validationResult.error);
    }
    const {
        fileKeysToDelete
    } = validationResult.value;

    return await Promise.all(fileKeysToDelete.map(fileKey => deleteFile({fileKey})));
}

const getPresignedUrlForObjectGetValidation = Joi.object({
    fileKey: Joi.string(),
    expires: Joi.number().integer().positive().default(100)
});
async function getPresignedUrlForObjectGet(requestObj){
    const validationResult = getPresignedUrlForObjectGetValidation.validate(requestObj);
    if(validationResult.error){
        throw new BadRequestError(validationResult.error);
    }
    const {
        fileKey,
        expires
    } = validationResult.value;

    return await firebaseStorage.admin.bucket().getSignedUrl({
        fileKey,
        expires,
        action: 'get'
    });
}

const getPresignedUrlForObjectPutValidation = Joi.object({
    fileKey: Joi.string(),
    expires: Joi.number().integer().positive().default(100)
});
async function getPresignedUrlForObjectPut(requestObj){
    const validationResult = getPresignedUrlForObjectPutValidation.validate(requestObj);
    if(validationResult.error){
        throw new BadRequestError(validationResult.error);
    }

    const {
        fileKey,
        expires
    } = validationResult.value;

    return await firebaseStorage.admin.bucket().getSignedUrl({
        fileKey,
        expires,
        action: 'write'
    });
}

const getPresignedUrlForObjectDeleteValidation = Joi.object({
    fileKey: Joi.string(),
    expires: Joi.number().integer().positive().default(100)
});
async function getPresignedUrlForObjectDelete(requestObj){
    const validationResult = getPresignedUrlForObjectDeleteValidation.validate(requestObj);
    if(validationResult.error){
        throw new BadRequestError(validationResult.error);
    }

    const {
        fileKey,
        expires
    } = validationResult.value;

    return await firebaseStorage.admin.bucket().getSignedUrl({
        fileKey,
        expires,
        action: 'delete'
    });
}


module.exports = {
    listFiles,
    getFile,
    putFile,
    deleteFile,
    deleteFilesBulk,
    getPresignedUrlForObjectGet,
    getPresignedUrlForObjectPut,
    getPresignedUrlForObjectDelete
}