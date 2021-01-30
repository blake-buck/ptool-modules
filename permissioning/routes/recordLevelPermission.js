
    const express = require('express');
    const router = express.Router();

    const dependencyInjector = require('../dependency-injector.js');
    const recordLevelPermissionController = dependencyInjector.inject('recordLevelPermissionController');

    const {hasPermission} = require('../middleware/middleware');
    
    router.get(
        '/recordLevelPermission', 
        hasPermission('RECORD_LEVEL_PERMISSION_GET'),
        recordLevelPermissionController.getRecordLevelPermissions
    );
    router.get(
        '/recordLevelPermission/:id', 
        hasPermission('RECORD_LEVEL_PERMISSION_GET'),
        recordLevelPermissionController.getSpecificRecordLevelPermission
    );

    router.post(
        '/recordLevelPermission', 
        hasPermission('RECORD_LEVEL_PERMISSION_POST'),
        recordLevelPermissionController.postRecordLevelPermission
    );

    router.put(
        '/recordLevelPermission', 
        hasPermission('RECORD_LEVEL_PERMISSION_MODIFY'),
        recordLevelPermissionController.updateRecordLevelPermissions
    );
    router.put(
        '/recordLevelPermission/:id', 
        hasPermission('RECORD_LEVEL_PERMISSION_MODIFY'),
        recordLevelPermissionController.updateSpecificRecordLevelPermission
    );
    
    router.patch(
        '/recordLevelPermission', 
        hasPermission('RECORD_LEVEL_PERMISSION_MODIFY'),
        recordLevelPermissionController.patchRecordLevelPermissions
    );
    router.patch(
        '/recordLevelPermission/:id', 
        hasPermission('RECORD_LEVEL_PERMISSION_MODIFY'),
        recordLevelPermissionController.patchSpecificRecordLevelPermission
    );

    router.delete(
        '/recordLevelPermission', 
        hasPermission('RECORD_LEVEL_PERMISSION_DELETE'),
        recordLevelPermissionController.deleteRecordLevelPermissions
    );
    router.delete(
        '/recordLevelPermission/:id', 
        hasPermission('RECORD_LEVEL_PERMISSION_DELETE'),
        recordLevelPermissionController.deleteSpecificRecordLevelPermission
    );

    module.exports = router;
    