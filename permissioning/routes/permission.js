
    const express = require('express');
    const router = express.Router();

    const dependencyInjector = require('../dependency-injector.js');
    const permissionController = dependencyInjector.inject('permissionController');

    router.get('/permission', permissionController.getPermissions);
    router.get('/permission/:id', permissionController.getSpecificPermission);

    router.post('/permission', permissionController.postPermission);

    router.put('/permission', permissionController.updatePermissions);
    router.put('/permission/:id', permissionController.updateSpecificPermission);
    
    router.patch('/permission', permissionController.patchPermissions);
    router.patch('/permission/:id', permissionController.patchSpecificPermission);

    router.delete('/permission', permissionController.deletePermissions);
    router.delete('/permission/:id', permissionController.deleteSpecificPermission);

    module.exports = router;
    