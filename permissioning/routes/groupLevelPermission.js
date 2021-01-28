
    const express = require('express');
    const router = express.Router();

    const dependencyInjector = require('../dependency-injector.js');
    const groupLevelPermissionController = dependencyInjector.inject('groupLevelPermissionController');

    router.get('/groupLevelPermission', groupLevelPermissionController.getGroupLevelPermissions);
    router.get('/groupLevelPermission/:id', groupLevelPermissionController.getSpecificGroupLevelPermission);

    router.post('/groupLevelPermission', groupLevelPermissionController.postGroupLevelPermission);

    router.put('/groupLevelPermission', groupLevelPermissionController.updateGroupLevelPermissions);
    router.put('/groupLevelPermission/:id', groupLevelPermissionController.updateSpecificGroupLevelPermission);
    
    router.patch('/groupLevelPermission', groupLevelPermissionController.patchGroupLevelPermissions);
    router.patch('/groupLevelPermission/:id', groupLevelPermissionController.patchSpecificGroupLevelPermission);

    router.delete('/groupLevelPermission', groupLevelPermissionController.deleteGroupLevelPermissions);
    router.delete('/groupLevelPermission/:id', groupLevelPermissionController.deleteSpecificGroupLevelPermission);

    module.exports = router;
    