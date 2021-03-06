const express = require('express');
const router = express.Router();

const dependencyInjector = require('../dependency-injector');
const fileUploadController = dependencyInjector.inject('fileUploadController');

router.get('/upload/files', fileUploadController.listFiles);
router.get('/upload/file/:fileKey', fileUploadController.getFile);

router.get('/upload/file/:fileKey/url/get', fileUploadController.getPresignedUrlForObjectGet);
router.get('/upload/file/:fileKey/url/put', fileUploadController.getPresignedUrlForObjectPut);
router.get('/upload/file/:fileKey/url/delete', fileUploadController.getPresignedUrlForObjectDelete);

router.put('/upload/file/:fileKey', fileUploadController.putFile);

router.delete('/upload/files', fileUploadController.deleteFilesBulk);
router.delete('/upload/file/:fileKey', fileUploadController.deleteFile);


module.exports = router;