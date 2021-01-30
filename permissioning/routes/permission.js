
    const express = require('express');
    const router = express.Router();

    const dependencyInjector = require('../dependency-injector.js');
    const permissionController = dependencyInjector.inject('permissionController');

    const {hasPermission} = require('../middleware/middleware');

    router.get(
        '/permission', 
        hasPermission('PERMISSION_GET'),
        permissionController.getPermissions
    );
    router.get(
        '/permission/:id', 
        hasPermission('PERMISSION_GET'),
        permissionController.getSpecificPermission
    );

    router.post(
        '/permission', 
        hasPermission('PERMISSION_POST'),
        permissionController.postPermission
    );

    router.put(
        '/permission', 
        hasPermission('PERMISSION_MODIFY'),
        permissionController.updatePermissions
    );
    router.put(
        '/permission/:id', 
        hasPermission('PERMISSION_MODIFY'),
        permissionController.updateSpecificPermission
    );
    
    router.patch(
        '/permission', 
        hasPermission('PERMISSION_MODIFY'),
        permissionController.patchPermissions
    );
    router.patch(
        '/permission/:id', 
        hasPermission('PERMISSION_MODIFY'),
        permissionController.patchSpecificPermission
    );

    router.delete(
        '/permission', 
        hasPermission('PERMISSION_DELETE'),
        permissionController.deletePermissions
    );
    router.delete(
        '/permission/:id', 
        hasPermission('PERMISSION_DELETE'),
        permissionController.deleteSpecificPermission
    );

    module.exports = router;
    