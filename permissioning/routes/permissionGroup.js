
    const express = require('express');
    const router = express.Router();

    const dependencyInjector = require('../dependency-injector.js');
    const permissionGroupController = dependencyInjector.inject('permissionGroupController');

    const {hasPermission} = require('../middleware/middleware');

    router.get(
        '/permissionGroup', 
        hasPermission('PERMISSION_GROUP_GET'), 
        permissionGroupController.getPermissionGroups
    );
    router.get(
        '/permissionGroup/:id', 
        hasPermission('PERMISSION_GROUP_GET'), 
        permissionGroupController.getSpecificPermissionGroup
    );

    router.post(
        '/permissionGroup', 
        hasPermission('PERMISSION_GROUP_POST'), 
        permissionGroupController.postPermissionGroup
    );

    router.put(
        '/permissionGroup',
        hasPermission('PERMISSION_GROUP_MODIFY'), 
        permissionGroupController.updatePermissionGroups
    );
    router.put(
        '/permissionGroup/:id',
        hasPermission('PERMISSION_GROUP_MODIFY'),  
        permissionGroupController.updateSpecificPermissionGroup
    );
    
    router.patch(
        '/permissionGroup',
        hasPermission('PERMISSION_GROUP_MODIFY'), 
        permissionGroupController.patchPermissionGroups
    );
    router.patch(
        '/permissionGroup/:id',
        hasPermission('PERMISSION_GROUP_MODIFY'), 
        permissionGroupController.patchSpecificPermissionGroup
    );

    router.delete(
        '/permissionGroup',
        hasPermission('PERMISSION_GROUP_DELETE'), 
        permissionGroupController.deletePermissionGroups
    );
    router.delete(
        '/permissionGroup/:id',
        hasPermission('PERMISSION_GROUP_DELETE'), 
        permissionGroupController.deleteSpecificPermissionGroup
    );

    module.exports = router;
    