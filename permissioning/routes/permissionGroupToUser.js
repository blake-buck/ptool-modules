const express = require('express');
const router = express.Router();

const dependencyInjector = require('../dependency-injector.js');
const permissionGroupToUserController = dependencyInjector.inject('permissionGroupToUserController');

const {hasPermission} = require('../middleware/middleware');

router.get(
    '/permissionGroupToUser', 
    hasPermission('PERMISSION_GROUP_TO_USER_GET'),
    permissionGroupToUserController.getPermissionGroupToUsers
);
router.get(
    '/permissionGroupToUser/:id', 
    hasPermission('PERMISSION_GROUP_TO_USER_GET'),
    permissionGroupToUserController.getSpecificPermissionGroupToUser
);

router.post(
    '/permissionGroupToUser', 
    hasPermission('PERMISSION_GROUP_TO_USER_POST'),
    permissionGroupToUserController.postPermissionGroupToUser
);

router.put(
    '/permissionGroupToUser', 
    hasPermission('PERMISSION_GROUP_TO_USER_MODIFY'),
    permissionGroupToUserController.updatePermissionGroupToUsers
);
router.put(
    '/permissionGroupToUser/:id', 
    hasPermission('PERMISSION_GROUP_TO_USER_MODIFY'),
    permissionGroupToUserController.updateSpecificPermissionGroupToUser
);

router.patch(
    '/permissionGroupToUser', 
    hasPermission('PERMISSION_GROUP_TO_USER_MODIFY'),
    permissionGroupToUserController.patchPermissionGroupToUsers
);
router.patch(
    '/permissionGroupToUser/:id', 
    hasPermission('PERMISSION_GROUP_TO_USER_MODIFY'),
    permissionGroupToUserController.patchSpecificPermissionGroupToUser
);

router.delete(
    '/permissionGroupToUser', 
    hasPermission('PERMISSION_GROUP_TO_USER_DELETE'),
    permissionGroupToUserController.deletePermissionGroupToUsers
);
router.delete(
    '/permissionGroupToUser/:id', 
    hasPermission('PERMISSION_GROUP_TO_USER_DELETE'),
    permissionGroupToUserController.deleteSpecificPermissionGroupToUser
);

module.exports = router;
