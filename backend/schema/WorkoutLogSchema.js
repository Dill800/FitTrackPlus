const mongoose = require('mongoose')

const collectionName = 'workout_logs' // Database table name

const workoutLogSchema = new mongoose.Schema({
	username : {type: String, required: true},
	datetime : {type: Date, required: true, default: Date.now},
}, {timestamps: true});

// Mongoose Middleware
workoutLogSchema.pre('save', function(next) {
    if (!this.username) {
		console.log('models/user.js> ERROR: No username provided!')
		next()
    }
    if (!this.datetime) {
		console.log('models/user.js> ERROR: No datestring provided!')
		next()
    }
})

var WorkoutLog = mongoose.model(collectionName, workoutLogSchema);
module.exports = WorkoutLog