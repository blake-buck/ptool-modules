
    const express = require('express');
    const router = express.Router();

    const dependencyInjector = require('../dependency-injector.js');
    const permissionGroupController = dependencyInjector.inject('permissionGroupController');

    router.get('/permissionGroup', permissionGroupController.getPermissionGroups);
    router.get('/permissionGroup/:id', permissionGroupController.getSpecificPermissionGroup);

    router.post('/permissionGroup', permissionGroupController.postPermissionGroup);

    router.put('/permissionGroup', permissionGroupController.updatePermissionGroups);
    router.put('/permissionGroup/:id', permissionGroupController.updateSpecificPermissionGroup);
    
    router.patch('/permissionGroup', permissionGroupController.patchPermissionGroups);
    router.patch('/permissionGroup/:id', permissionGroupController.patchSpecificPermissionGroup);

    router.delete('/permissionGroup', permissionGroupController.deletePermissionGroups);
    router.delete('/permissionGroup/:id', permissionGroupController.deleteSpecificPermissionGroup);

    module.exports = router;
    