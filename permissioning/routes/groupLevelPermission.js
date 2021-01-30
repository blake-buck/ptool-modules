
    const express = require('express');
    const router = express.Router();

    const dependencyInjector = require('../dependency-injector.js');
    const groupLevelPermissionController = dependencyInjector.inject('groupLevelPermissionController');

    const {hasPermission} = require('../middleware/middleware');
    
    router.get(
        '/groupLevelPermission',
        hasPermission('GROUP_LEVEL_PERMISSION_GET'), 
        groupLevelPermissionController.getGroupLevelPermissions
    );
    router.get(
        '/groupLevelPermission/:id',
        hasPermission('GROUP_LEVEL_PERMISSION_GET'), 
        groupLevelPermissionController.getSpecificGroupLevelPermission
    );

    router.post(
        '/groupLevelPermission', 
        hasPermission('GROUP_LEVEL_PERMISSION_POST'),
        groupLevelPermissionController.postGroupLevelPermission
    );

    router.put(
        '/groupLevelPermission', 
        hasPermission('GROUP_LEVEL_PERMISSION_MODIFY'),
        groupLevelPermissionController.updateGroupLevelPermissions
    );
    router.put(
        '/groupLevelPermission/:id', 
        hasPermission('GROUP_LEVEL_PERMISSION_MODIFY'),
        groupLevelPermissionController.updateSpecificGroupLevelPermission
    );
    
    router.patch(
        '/groupLevelPermission', 
        hasPermission('GROUP_LEVEL_PERMISSION_MODIFY'),
        groupLevelPermissionController.patchGroupLevelPermissions
    );
    router.patch(
        '/groupLevelPermission/:id', 
        hasPermission('GROUP_LEVEL_PERMISSION_DELETE'),
        groupLevelPermissionController.patchSpecificGroupLevelPermission
    );

    router.delete(
        '/groupLevelPermission', 
        hasPermission('GROUP_LEVEL_PERMISSION_DELETE'),
        groupLevelPermissionController.deleteGroupLevelPermissions
    );
    router.delete(
        '/groupLevelPermission/:id', 
        hasPermission('GROUP_LEVEL_PERMISSION_MODIFY'),
        groupLevelPermissionController.deleteSpecificGroupLevelPermission
    );

    module.exports = router;
    