const express = require('express');
const {
    register,
    login,
    logout,
    token,
    } = require('../controllers/auth.controller');

const authRoutes = express.Router();

authRoutes.post('/register', controller.registerUser);

authRoutes.post('/login', controller.login);

authRoutes.post('/token', token);

authRoutes.post('/logout', logout);

module.exports = authRoutes;
