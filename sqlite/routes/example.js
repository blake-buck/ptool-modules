const express = require('express');
const router = express.Router();
const dependencyInjector = require('../dependency-injector.js');
const exampleController = dependencyInjector.inject('exampleController');

router.get('/example', exampleController.getExamples);
router.get('/example/:id', exampleController.getSpecificExample);

router.post('/example', exampleController.postExample);

router.put('/example', exampleController.updateExamples);
router.put('/example/:id', exampleController.updateSpecificExample);

router.patch('/example', exampleController.patchExamples);
router.patch('/example/:id', exampleController.patchSpecificExample);

router.delete('/example', exampleController.deleteExamples);
router.delete('/example/:id', exampleController.deleteSpecificExample);

module.exports = router;