const dependencyInjector = require('../dependency-injector');
const stripeController = dependencyInjector.inject('stripeController');

const express = require('express');
const router = express.Router();

module.exports = router;