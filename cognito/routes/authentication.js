const express = require('express');
const router = express.Router();

const dependencyInjector = require('../dependency-injector');
const authenticationController = dependencyInjector.inject('authenticationController');

const {isAuthenticated} = require('../middleware/middleware.js');

router.post('/api/v1/register', authenticationController.register);
router.post('/api/v1/login', authenticationController.login);
router.post('/api/v1/refresh-token', authenticationController.refreshToken);
router.post('/api/v1/change-password', isAuthenticated, authenticationController.changePassword);
router.post('/api/v1/forgot-password', authenticationController.forgotPassword);
router.post('/api/v1/forgot-password/confirm', authenticationController.confirmForgotPassword);
router.post('/api/v1/delete-account', isAuthenticated, authenticationController.deleteAccount);

module.exports = router;