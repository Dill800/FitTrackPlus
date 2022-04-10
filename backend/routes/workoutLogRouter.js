const express = require('express')
const workoutLogRouter = new express.Router()
const workoutLogController = require('../controllers/workoutLogController')

// Add/remove a new workout log, add/edit/remove exercises from a specific workout log
workoutLogRouter.post('/createWorkoutLog', workoutLogController.createWorkoutLog)
// workoutLogRouter.delete('/deleteWorkoutLog', workoutLogController.deleteWorkoutLog)

// workoutLogRouter.post('/addExercise', workoutLogController.addExercise)
// workoutLogRouter.put('/editExercise', workoutLogController.editExercise)
// workoutLogRouter.delete('/deleteExericse', workoutLogController.deleteExericse)

module.exports = workoutLogRouter