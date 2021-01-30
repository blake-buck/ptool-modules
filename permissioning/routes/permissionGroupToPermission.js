
    const express = require('express');
    const router = express.Router();

    const dependencyInjector = require('../dependency-injector.js');
    const permissionGroupToPermissionController = dependencyInjector.inject('permissionGroupToPermissionController');

    const {hasPermission} = require('../middleware/middleware');

    router.get(
        '/permissionGroupToPermission', 
        hasPermission('PERMISSION_GROUP_TO_PERMISSION_GET'),
        permissionGroupToPermissionController.getPermissionGroupToPermissions
    );
    router.get(
        '/permissionGroupToPermission/:id', 
        hasPermission('PERMISSION_GROUP_TO_PERMISSION_GET'),
        permissionGroupToPermissionController.getSpecificPermissionGroupToPermission
    );

    router.post(
        '/permissionGroupToPermission', 
        hasPermission('PERMISSION_GROUP_TO_PERMISSION_POST'),
        permissionGroupToPermissionController.postPermissionGroupToPermission
    );

    router.put(
        '/permissionGroupToPermission', 
        hasPermission('PERMISSION_GROUP_TO_PERMISSION_MODIFY'),
        permissionGroupToPermissionController.updatePermissionGroupToPermissions
    );
    router.put(
        '/permissionGroupToPermission/:id', 
        hasPermission('PERMISSION_GROUP_TO_PERMISSION_MODIFY'),
        permissionGroupToPermissionController.updateSpecificPermissionGroupToPermission
    );
    
    router.patch(
        '/permissionGroupToPermission', 
        hasPermission('PERMISSION_GROUP_TO_PERMISSION_MODIFY'),
        permissionGroupToPermissionController.patchPermissionGroupToPermissions
    );
    router.patch(
        '/permissionGroupToPermission/:id', 
        hasPermission('PERMISSION_GROUP_TO_PERMISSION_MODIFY'),
        permissionGroupToPermissionController.patchSpecificPermissionGroupToPermission
    );

    router.delete(
        '/permissionGroupToPermission', 
        hasPermission('PERMISSION_GROUP_TO_PERMISSION_DELETE'),
        permissionGroupToPermissionController.deletePermissionGroupToPermissions
    );
    router.delete(
        '/permissionGroupToPermission/:id', 
        hasPermission('PERMISSION_GROUP_TO_PERMISSION_DELETE'),
        permissionGroupToPermissionController.deleteSpecificPermissionGroupToPermission
    );

    module.exports = router;
    