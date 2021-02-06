const {
    ListBucketsCommand,
    CreateBucketCommand,
    DeleteBucketCommand,
    ListObjectsV2Command,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand,
    DeleteObjectsCommand
} = require('@aws-sdk/client-s3');
const dependencyInjector = require('../dependency-injector');
const s3Client = dependencyInjector.inject('s3Client');
const getPresignedUrl = dependencyInjector.inject('s3GetPresignedUrl');

async function listBuckets(){
    return {status: 200, body: await s3Client.send(new ListBucketsCommand({}))};
}

async function getBucket(){
    return {status: 200, body: {}};
}

async function createBucket(requestObj){
    const {bucketId, location} = requestObj;
    return {
        status: 200, 
        body: await s3Client.send(
            new CreateBucketCommand({
                Bucket: bucketId,
                CreateBucketConfiguration: {
                    LocationConstraint: location
                }
            })
        )
    };
}

async function putBucket(){
    return {status: 200, body: {}};
}

async function deleteBucket(bucketId){
    return {status: 200, body: await s3Client.send(
        new DeleteBucketCommand({
            Bucket: bucketId
        })
    )};
}

async function listObjectsInBucket(requestObj){
    const {bucketId, limit, startAfter, prefix} = requestObj;
    return {status: 200, body: await s3Client.send(
        new ListObjectsV2Command({
            Bucket: bucketId, 
            MaxKeys: limit,
            StartAfter: startAfter,
            Prefix: prefix
        })
    )};
}

async function getObject(requestObj){
    const {bucketId, objectKey} = requestObj;
    return {status: 200, body: await s3Client.send(
        new GetObjectCommand({
            Bucket:bucketId,
            Key: objectKey
        })
    )};    
}

async function getPresignedUrlForObjectGet(requestObj){
    const {bucketId, objectKey, expiration} = requestObj;

    return {
        status: 200,
        body: {
            url: await getPresignedUrl(
                s3Client, 
                new GetObjectCommand({
                    Bucket: bucketId,
                    Key: objectKey
                }),
                {
                    expiresIn: expiration
                }
            )
        }
    }
}

async function putObject(requestObj){
    const {bucketId, objectKey, base64} = requestObj;
    const body = Buffer.from(base64, 'base64');
    return {status: 200, body: await s3Client.send(
        new PutObjectCommand({
            Bucket: bucketId,
            Key: objectKey,
            Body: body
        })
    )};
}

async function getPresignedUrlForObjectPut(requestObj){
    const {bucketId, objectKey, expiration} = requestObj;
    return {
        status: 200,
        body: {
            url: await getPresignedUrl(
                s3Client, 
                new PutObjectCommand({
                    Bucket: bucketId,
                    Key: objectKey
                }),
                {
                    expiresIn: expiration
                }
            )
        }
    }
}

async function deleteObject(requestObj){
    const {bucketId, objectKey} = requestObj;
    return {status: 200, body: await s3Client.send(
        new DeleteObjectCommand({
            Bucket: bucketId,
            Key: objectKey
        })
    )};
}

async function deleteObjectsBulk(requestObj){
    const {bucketId, objectKeysToDelete} = requestObj;
    return {status: 200, body: await s3Client.send(
        new DeleteObjectsCommand({
            Bucket: bucketId,
            Delete:{
                Objects:objectKeysToDelete.map((key) => ({Key: key}))
            }
        })
    )};
}

async function getPresignedUrlForObjectDelete(requestObj){
    const {bucketId, objectKey, expiration} = requestObj;

    return {
        status: 200,
        body: {
            url: await getPresignedUrl(
                s3Client, 
                new DeleteObjectCommand({
                    Bucket: bucketId,
                    Key: objectKey
                }),
                {
                    expiresIn: expiration
                }
            )
        }
    }
}



module.exports = {
    listBuckets,
    getBucket,
    createBucket,
    putBucket,
    deleteBucket,
    listObjectsInBucket,
    getObject,
    putObject,
    deleteObject,
    deleteObjectsBulk,

    getPresignedUrlForObjectGet,
    getPresignedUrlForObjectPut,
    getPresignedUrlForObjectDelete
}