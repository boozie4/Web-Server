const express = require('express');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controllers');
const verifyToken = require('../middleware/auth.middleware');

const userRoutes = express.Router();

userRoutes.get('/me', userController.getMe);

userRoutes.post('/me/update', verifyToken, authController.updateUser);

module.exports = userRoutes;
