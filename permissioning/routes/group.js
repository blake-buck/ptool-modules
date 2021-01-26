
    const express = require('express');
    const router = express.Router();

    const dependencyInjector = require('../dependency-injector.js');
    const groupController = dependencyInjector.inject('groupController');

    router.get('/group', groupController.getGroups);
    router.get('/group/:id', groupController.getSpecificGroup);

    router.post('/group', groupController.postGroup);

    router.put('/group', groupController.updateGroups);
    router.put('/group/:id', groupController.updateSpecificGroup);
    
    router.patch('/group', groupController.patchGroups);
    router.patch('/group/:id', groupController.patchSpecificGroup);

    router.delete('/group', groupController.deleteGroups);
    router.delete('/group/:id', groupController.deleteSpecificGroup);

    module.exports = router;
    