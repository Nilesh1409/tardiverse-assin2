
const express = require("express");

const userRouter = express.Router();
const { createUser, login } = require("../handler/user");

userRouter.post('/reagister',createUser);
userRouter.post('/login',login);

module.exports = userRouter;