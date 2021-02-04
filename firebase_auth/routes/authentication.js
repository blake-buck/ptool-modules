const express = require('express');
const router = express.Router();

const {
    isAuthenticated
} = require('../middleware/middleware.js');

const dependencyInjector = require('../dependency-injector.js');
const authenticationController = dependencyInjector.inject('authenticationController');

router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);
router.post('/change-password', isAuthenticated, authenticationController.changePassword);
router.post('/forgot-password', authenticationController.forgotPassword);
router.post('/delete-account', isAuthenticated, authenticationController.deleteAccount);

module.exports = router;