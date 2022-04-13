const mongoose = require('mongoose')
const bcrypt = require('bcryptjs') // Avoid working w/ plaintext

const collectionName = 'users' // Database table name

// FIXME WIP schema design
const userSchema = new mongoose.Schema({
	username : {type: String, required: true},
    passwordHash : {type: String, required: true},
	pfpFilepath: { data: Buffer, contentType: String},
    streakCounter : {type: mongoose.Number, required: true, default: 0},
	lastCheckIn: {type: Date, required: true, default: new Date(-287364287364)},
    friendList: {type: [String], required: true, default: []},
	groupName: {type: String, required: true, default: 'Fellow'},
	workoutlogList: {
		type: [{
			date: {type: Date, required: true, default: new Date(-287364287364)},
			exercises:[{
				name: {type: String, required: true},
				sets: {type: mongoose.Number, required: true},
				reps: {type: mongoose.Number, required: true},
				weight: {type: mongoose.Number, required: true},
			}]
		}],
		required: true,
		default: []
	},
	weightList: {type: [{weight: mongoose.Number, date: Date}], required: true, default: []},
	currentWeight : {type: mongoose.Number, required: true, default: 0},
	goalWeight : {type: mongoose.Number, required: true, default: 0},
	calorieList: {type: [{weight: mongoose.Number, date: Date}], required: true, default: []},
	currentCalorie : {type: mongoose.Number, required: true, default: 0},
	calorieGoal : {type: mongoose.Number, required: true, default: 0},
	proteinList: {type: [{weight: mongoose.Number, date: Date}], required: true, default: []},
	currentProtein : {type: mongoose.Number, required: true, default: 0},
	goalProtein : {type: mongoose.Number, required: true, default: 0},
	fatList: {type: [{weight: mongoose.Number, date: Date}], required: true, default: []},
	currentFat : {type: mongoose.Number, required: true, default: 0},
	goalFat : {type: mongoose.Number, required: true, default: 0},
	carbList: {type: [{weight: mongoose.Number, date: Date}], required: true, default: []},
	currentCarb : {type: mongoose.Number, required: true, default: 0},
	goalCarb : {type: mongoose.Number, required: true, default: 0},

}, {timestamps: true});


// Password hashing methods
userSchema.methods = {
    checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.passwordHash)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Mongoose Middleware
userSchema.pre('save', function(next) {
    if (!this.passwordHash) {
		console.log('models/user.js> ERROR: [[[ NO PASSWORD PROVIDED ]]]')
		next()
	} else {
		console.log('models/user.js> hashPassword has been pre-saved');
		this.passwordHash = this.hashPassword(this.passwordHash)
		next()
	}
})

var User = mongoose.model(collectionName, userSchema);
module.exports = User