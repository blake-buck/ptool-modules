const express = require('express');
const router = express.Router();

const {isAuthenticated} = require('../middleware/middleware.js');

const {
    register,
    login,
    refreshToken,
    changePassword,
    forgotPassword,
    confirmForgotPassword,
    deleteAccount
} = require('../controllers/authentication.js');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.post('/change-password', isAuthenticated, changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/forgot-password/confirm', confirmForgotPassword);
router.post('/delete-account', isAuthenticated, deleteAccount);

module.exports = router;