const express = require('express');
const router = express.Router();

const dependencyInjector = require('../dependency-injector');
const fileUploadController = dependencyInjector.inject('fileUploadController')

router.use('/upload', () => {
    router.get('/buckets', fileUploadController.listBuckets)
    router.get('/bucket/:bucketId', fileUploadController.getBucket);
    router.post('/bucket', fileUploadController.createBucket);
    router.put('/bucket/:bucketId', fileUploadController.putBucket);
    router.delete('/bucket/:bucketId', fileUploadController.deleteBucket);

    router.get('/bucket/:bucketId/objects', fileUploadController.listObjectsInBucket);
    router.get('/bucket/:bucketId/object/:objectKey', fileUploadController.getObject);
    router.put('/bucket/:bucketId:/object/:objectKey', fileUploadController.putObject);
    router.delete('/bucket/:bucketId/object/:objectKey', fileUploadController.deleteObject);
});











module.exports = router;