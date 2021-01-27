
    const express = require('express');
    const router = express.Router();

    const dependencyInjector = require('../dependency-injector.js');
    const recordLevelPermissionController = dependencyInjector.inject('recordLevelPermissionController');

    router.get('/recordLevelPermission', recordLevelPermissionController.getRecordLevelPermissions);
    router.get('/recordLevelPermission/:id', recordLevelPermissionController.getSpecificRecordLevelPermission);

    router.post('/recordLevelPermission', recordLevelPermissionController.postRecordLevelPermission);

    router.put('/recordLevelPermission', recordLevelPermissionController.updateRecordLevelPermissions);
    router.put('/recordLevelPermission/:id', recordLevelPermissionController.updateSpecificRecordLevelPermission);
    
    router.patch('/recordLevelPermission', recordLevelPermissionController.patchRecordLevelPermissions);
    router.patch('/recordLevelPermission/:id', recordLevelPermissionController.patchSpecificRecordLevelPermission);

    router.delete('/recordLevelPermission', recordLevelPermissionController.deleteRecordLevelPermissions);
    router.delete('/recordLevelPermission/:id', recordLevelPermissionController.deleteSpecificRecordLevelPermission);

    module.exports = router;
    