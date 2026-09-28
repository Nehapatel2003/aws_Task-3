const { createUserController,loginUserController} = require('../Controllers/user_Controller');
const cookieToken  = require('../Middleware/auth_Middleware')
const express = require('express');

const userRouter = express.Router();

userRouter.post("/api/auth/register", createUserController);
userRouter.post("/api/auth/login",loginUserController)

module.exports = userRouter;