const dependencyInjector = require('../dependency-injector');
const stripe = dependencyInjector.inject('stripe');

const Joi = require('joi');

module.exports = {}