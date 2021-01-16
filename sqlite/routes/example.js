const express = require('express');
const router = express.Router();

const {
    getExamples,
    getSpecificExample,
    postExample,
    updateExamples,
    updateSpecificExample,
    deleteExamples,
    deleteSpecificExample
} = require('../controllers/example');

router.get('/example', getExamples);
router.get('/example/:id', getSpecificExample);

router.post('/example', postExample);

router.put('/example', updateExamples);
router.put('/example/:id', updateSpecificExample);

router.delete('/example', deleteExamples);
router.delete('/example/:id', deleteSpecificExample);

module.exports = router;