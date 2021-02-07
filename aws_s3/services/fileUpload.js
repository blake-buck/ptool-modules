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
    const response = await s3Client.send(new ListBucketsCommand({}));
    return {status: 200, body: response.Buckets ? response.Buckets : []};
}

async function createBucket(requestObj){
    const {bucketId, location} = requestObj;
    const response = await s3Client.send(
        new CreateBucketCommand({
            Bucket: bucketId,
            CreateBucketConfiguration: {
                LocationConstraint: location
            }
        })
    );

    return {
        status: 200, 
        body: {message: `Bucket ${bucketId} created successfully`, bucketId}
    };
}

async function deleteBucket(bucketId){
    await s3Client.send(
        new DeleteBucketCommand({
            Bucket: bucketId
        })
    )
    return {status: 200, body: {message: `Bucket ${bucketId} deleted successfully`}};
}

async function listObjectsInBucket(requestObj){
    const {bucketId, limit, startAfter, prefix} = requestObj;
    const response = await s3Client.send(
        new ListObjectsV2Command({
            Bucket: bucketId, 
            MaxKeys: limit,
            StartAfter: startAfter,
            Prefix: prefix
        })
    );

    return {status: 200, body: response.Contents ? response.Contents : []};
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
    await s3Client.send(
        new PutObjectCommand({
            Bucket: bucketId,
            Key: objectKey,
            Body: body
        })
    )
    return {status: 200, body: {message: `Object ${objectKey} put successfully`, objectKey}};
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
    await s3Client.send(
        new DeleteObjectCommand({
            Bucket: bucketId,
            Key: objectKey
        })
    )
    return {status: 200, body: {message:`Object ${objectKey} deleted successfully`, objectKey}};
}

async function deleteObjectsBulk(requestObj){
    const {bucketId, objectKeysToDelete} = requestObj;
    await s3Client.send(
        new DeleteObjectsCommand({
            Bucket: bucketId,
            Delete:{
                Objects:objectKeysToDelete.map((key) => ({Key: key}))
            }
        })
    )
    return {status: 200, body: {message: 'Objects deleted successfully'}};
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
    createBucket,
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