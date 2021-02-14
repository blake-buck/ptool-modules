const dependencyInjector = require('../dependency-injector');
const emailController = dependencyInjector.inject('emailController');
const express = require('express');
const router = express.Router();

router.post('/email', emailController.sendEmail);

module.exports = router;