const {
    ListBucketsCommand,
    CreateBucketCommand,
    DeleteBucketCommand,
    ListObjectsV2Command,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand
} = require('@aws-sdk/client-s3');
const dependencyInjector = require('../dependency-injector');
const s3Client = dependencyInjector.inject('s3Client');

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
    const {bucketId, limit, startAfter} = requestObj;
    return {status: 200, body: await s3Client.send(
        new ListObjectsV2Command({
            Bucket: bucketId, 
            MaxKeys: limit,
            StartAfter: startAfter
        })
    )};
}

async function getObject(requestObj){
    const {bucketId, key} = requestObj;
    return {status: 200, body: await s3Client.send(
        new GetObjectCommand({
            Bucket:bucketId,
            Key: key
        })
    )};    
}

async function putObject(requestObj){
    const {bucketId, key, body} = requestObj;
    return {status: 200, body: await s3Client.send(
        new PutObjectCommand({
            Bucket: bucketId,
            Key: key,
            Body: body
        })
    )};
}

async function deleteObject(requestObj){
    const {bucketId, key} = requestObj;
    return {status: 200, body: await s3Client.send(
        new DeleteObjectCommand({
            Bucket: bucketId,
            Key: key
        })
    )};
}

async function deleteObjectsBulk(requestObj){
    
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
    deleteObject
}