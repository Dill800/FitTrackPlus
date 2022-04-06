const express = require('express')
const userRouter = new express.Router()
const userController = require('../controllers/userController')

// Creating a new account, check if its exists, then create if not exists
userRouter.get('/get', userController.getUser)
userRouter.post('/register', userController.exists, userController.create)
userRouter.post('/login', userController.authenticate)
userRouter.post('/addFriend', userController.addFriend)
userRouter.post('/removeFriend', userController.removeFriend)
userRouter.post('/joinGroup', userController.joinGroup)
userRouter.post('/checkIn', userController.checkIn)
userRouter.post('/addExercise', userController.addExercise)
userRouter.post('/removeExericse', userController.removeExercise)
userRouter.post('/addWeight', userController.addWeight)

// Logging in as an existing user
// userRouter.post('/login', userController.authenticate)

module.exports = userRouter