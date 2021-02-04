const express = require('express');
const router = express.Router();

const dependencyInjector = require('../dependency-injector');
const authenticationController = dependencyInjector.inject('authenticationController');

const {isAuthenticated} = require('../middleware/middleware.js');

router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);
router.post('/refresh-token', authenticationController.refreshToken);
router.post('/change-password', isAuthenticated, authenticationController.changePassword);
router.post('/forgot-password', authenticationController.forgotPassword);
router.post('/forgot-password/confirm', authenticationController.confirmForgotPassword);
router.post('/delete-account', isAuthenticated, authenticationController.deleteAccount);

module.exports = router;