const express = require('express');
const router = express.Router();
const dependencyInjector = require('../dependency-injector.js');
const exampleController = dependencyInjector.inject('exampleController');

router.get('/api/v1/example', exampleController.getExamples);
router.get('/api/v1/example/:id', exampleController.getSpecificExample);

router.post('/api/v1/example', exampleController.postExample);

router.put('/api/v1/example', exampleController.updateExamples);
router.put('/api/v1/example/:id', exampleController.updateSpecificExample);

router.patch('/api/v1/example', exampleController.patchExamples);
router.patch('/api/v1/example/:id', exampleController.patchSpecificExample);

router.delete('/api/v1/example', exampleController.deleteExamples);
router.delete('/api/v1/example/:id', exampleController.deleteSpecificExample);

module.exports = router;