const {
    ListBucketsCommand,
    DeleteBucketCommand,
    ListObjectsV2Command,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand
} = require('@aws-sdk/client-s3');
const s3Client = dependencyInjector.inject('s3Client');

async function listBuckets(){

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