const express = require('express');

const permissioningController = require('../permissioningController');

const permissioningRouter = express.Router();

permissioningRouter.get('/permission', permissioningController.getPermissions);
permissioningRouter.post('/permission', permissioningController.postPermission);
permissioningRouter.put('/permission', permissioningController.putPermissions);
permissioningRouter.delete('/permission', permissioningController.deletePermissions);

permissioningRouter.get('/permission/:id', permissioningController.getSpecificPermission);
permissioningRouter.put('/permission/:id', permissioningController.putSpecificPermission);
permissioningRouter.delete('/permission/:id', permissioningController.deleteSpecificPermission);

permissioningRouter.get('/permission/group', permissioningController.getPermissionGroups);
permissioningRouter.post('/permission/group', permissioningController.postPermissionGroup);
permissioningRouter.put('/permission/group', permissioningController.putPermissionGroups);
permissioningRouter.delete('/permission/group', permissioningController.deletePermissionGroups);

permissioningRouter.get('/permission/group/:id', permissioningController.getSpecificPermissionGroup);
permissioningRouter.put('/permission/group/:id', permissioningController.getSpecificPermissionGroup);
permissioningRouter.delete('/permission/group/:id', permissioningController.getSpecificPermissionGroup);

permissioningRouter.get('/permission/groupToUser', permissioningController.getGroupToUserLinks);
permissioningRouter.post('/permission/groupToUser', permissioningController.postGroupToUserLink);
permissioningRouter.put('/permission/groupToUser', permissioningController.putGroupToUserLinks);
permissioningRouter.delete('/permission/groupToUser', permissioningController.deleteGroupToUserLinks);

permissioningRouter.get('/permission/groupToUser/:id', permissioningController.getSpecificGroupToUserLink);
permissioningRouter.put('/permission/groupToUser/:id', permissioningController.putSpecificGroupToUserLink);
permissioningRouter.delete('/permission/groupToUser/:id', permissioningController.deleteSpecificGroupToUserLink);

permissioningRouter.get('/permission/groupToPermission', permissioningController.getGroupToPermissionLinks);
permissioningRouter.post('/permission/groupToPermission', permissioningController.postGroupToPermissionLink);
permissioningRouter.put('/permission/groupToPermission', permissioningController.putGroupToPermissionLinks);
permissioningRouter.delete('/permission/groupToPermission', permissioningController.deleteGroupToPermissionLinks);

permissioningRouter.get('/permission/groupToPermission/:id', permissioningController.getSpecificGroupToPermissionLink);
permissioningRouter.put('/permission/groupToPermission/:id', permissioningController.putSpecificGroupToPermissionLink);
permissioningRouter.delete('/permission/groupToPermission/:id', permissioningController.deleteSpecificGroupToPermissionLink);

module.exports = permissioningRouter;