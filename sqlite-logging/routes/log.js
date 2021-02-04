
    const express = require('express');
    const router = express.Router();
    
    const dependencyInjector = require('../dependency-injector.js');
    const logController = dependencyInjector.inject('logController');

    router.get('/log', logController.getLogs);
    router.get('/log/count', logController.getLogCount);
    router.get('/log/:id', logController.getSpecificLog);

    module.exports = router;
    