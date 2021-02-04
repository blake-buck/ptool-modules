
    const express = require('express');
    const router = express.Router();
    
    const dependencyInjector = require('../dependency-injector.js');
    const logController = dependencyInjector.inject('logController');

    router.get('/api/v1/log', logController.getLogs);
    router.get('/api/v1/log/count', logController.getLogCount);
    router.get('/api/v1/log/:id', logController.getSpecificLog);

    module.exports = router;
    