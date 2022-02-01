const express = require('express')
const userRouter = new express.Router()
const userController = require('../controllers/userController')

// Creating a new account, check if its exists, then create if not exists
userRouter.post('/', userController.exists, userController.create)

// Logging in as an existing user
// userRouter.post('/login', userController.authenticate)

module.exports = userRouter