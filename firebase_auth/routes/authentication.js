const express = require('express');
const router = express.Router();

const {
    isAuthenticated
} = require('../middleware/middleware.js');

const {
    register,
    login,
    changePassword,
    forgotPassword,
    deleteAccount,
} = require('../controllers/authentication');

router.post('/register', register);
router.post('/login', login);
router.post('/change-password', isAuthenticated, changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/delete-account', isAuthenticated, deleteAccount);

module.exports = router;