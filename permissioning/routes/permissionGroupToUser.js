const express = require('express');
const router = express.Router();

const dependencyInjector = require('../dependency-injector.js');
const permissionGroupToUserController = dependencyInjector.inject('permissionGroupToUserController');

router.get('/permissionGroupToUser', permissionGroupToUserController.getPermissionGroupToUsers);
router.get('/permissionGroupToUser/:id', permissionGroupToUserController.getSpecificPermissionGroupToUser);

router.post('/permissionGroupToUser', permissionGroupToUserController.postPermissionGroupToUser);

router.put('/permissionGroupToUser', permissionGroupToUserController.updatePermissionGroupToUsers);
router.put('/permissionGroupToUser/:id', permissionGroupToUserController.updateSpecificPermissionGroupToUser);

router.patch('/permissionGroupToUser', permissionGroupToUserController.patchPermissionGroupToUsers);
router.patch('/permissionGroupToUser/:id', permissionGroupToUserController.patchSpecificPermissionGroupToUser);

router.delete('/permissionGroupToUser', permissionGroupToUserController.deletePermissionGroupToUsers);
router.delete('/permissionGroupToUser/:id', permissionGroupToUserController.deleteSpecificPermissionGroupToUser);

module.exports = router;
