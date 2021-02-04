const express = require('express');
const router = express.Router();

const {
    isAuthenticated
} = require('../middleware/middleware.js');

const dependencyInjector = require('../dependency-injector.js');
const authenticationController = dependencyInjector.inject('authenticationController');

router.post('/api/v1/register', authenticationController.register);
router.post('/api/v1/login', authenticationController.login);
router.post('/api/v1/change-password', isAuthenticated, authenticationController.changePassword);
router.post('/api/v1/forgot-password', authenticationController.forgotPassword);
router.post('/api/v1/delete-account', isAuthenticated, authenticationController.deleteAccount);

module.exports = router;