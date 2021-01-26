
    const express = require('express');
    const router = express.Router();

    const dependencyInjector = require('../dependency-injector.js');
    const permissionGroupToPermissionController = dependencyInjector.inject('permissionGroupToPermissionController');

    router.get('/permissionGroupToPermission', permissionGroupToPermissionController.getPermissionGroupToPermissions);
    router.get('/permissionGroupToPermission/:id', permissionGroupToPermissionController.getSpecificPermissionGroupToPermission);

    router.post('/permissionGroupToPermission', permissionGroupToPermissionController.postPermissionGroupToPermission);

    router.put('/permissionGroupToPermission', permissionGroupToPermissionController.updatePermissionGroupToPermissions);
    router.put('/permissionGroupToPermission/:id', permissionGroupToPermissionController.updateSpecificPermissionGroupToPermission);
    
    router.patch('/permissionGroupToPermission', permissionGroupToPermissionController.patchPermissionGroupToPermissions);
    router.patch('/permissionGroupToPermission/:id', permissionGroupToPermissionController.patchSpecificPermissionGroupToPermission);

    router.delete('/permissionGroupToPermission', permissionGroupToPermissionController.deletePermissionGroupToPermissions);
    router.delete('/permissionGroupToPermission/:id', permissionGroupToPermissionController.deleteSpecificPermissionGroupToPermission);

    module.exports = router;
    