const express = require('express');
const router = express.Router();

const dependencyInjector = require('../dependency-injector');
const fileUploadController = dependencyInjector.inject('fileUploadController')

const bucketRouter = express.Router();
bucketRouter.get('/buckets', fileUploadController.listBuckets)
bucketRouter.get('/bucket/:bucketId', fileUploadController.getBucket);
bucketRouter.post('/bucket', fileUploadController.createBucket);
bucketRouter.put('/bucket/:bucketId', fileUploadController.putBucket);
bucketRouter.delete('/bucket/:bucketId', fileUploadController.deleteBucket);

const objectRouter = express.Router();
objectRouter.get('/bucket/:bucketId/objects', fileUploadController.listObjectsInBucket);
objectRouter.delete('/bucket/:bucketId/objects', fileUploadController.deleteObjectsBulk);

objectRouter.get('/bucket/:bucketId/object/:objectKey', fileUploadController.getObject);
objectRouter.put('/bucket/:bucketId/object/:objectKey', fileUploadController.putObject);
objectRouter.delete('/bucket/:bucketId/object/:objectKey', fileUploadController.deleteObject);

objectRouter.get('/bucket/:bucketId/object/:objectKey/url/get', fileUploadController.getPresignedUrlForObjectGet);
objectRouter.get('/bucket/:bucketId/object/:objectKey/url/put', fileUploadController.getPresignedUrlForObjectPut);
objectRouter.get('/bucket/:bucketId/object/:objectKey/url/delete', fileUploadController.getPresignedUrlForObjectDelete);




router.use('/upload', bucketRouter);
router.use('/upload', objectRouter);

module.exports = router;