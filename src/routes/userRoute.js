const express = require('express');
const userRouter = express.Router();

const user = require('../controllers/userController.js');

userRouter.post('/register', user.register);
userRouter.post('/login', user.login);

module.exports = userRouter;
