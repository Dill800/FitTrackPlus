const express = require('express')
const userRouter = new express.Router()
const userController = require('../controllers/userController')

// Creating a new account, check if its exists, then create if not exists
userRouter.get('/get', userController.getUser)
userRouter.get('/listGroupMembers', userController.listGroupMembers)
userRouter.post('/register', userController.exists, userController.create)
userRouter.post('/login', userController.authenticate)
userRouter.post('/addFriend', userController.addFriend)
userRouter.post('/removeFriend', userController.removeFriend)
userRouter.post('/joinGroup', userController.joinGroup)
userRouter.post('/checkIn', userController.checkIn)

// Add/remove a new workout log, add/edit/remove exercises from a specific workout log
// userRouter.get('/getUserWorkoutLogs', userController.getUserWorkoutLogs)

// userRouter.post('/createWorkoutLog', workoutLogController.createWorkoutLog)
// userRouter.delete('/deleteWorkoutLog', workoutLogController.deleteWorkoutLog)

// Logging in as an existing user
// userRouter.post('/login', userController.authenticate)

module.exports = userRouter