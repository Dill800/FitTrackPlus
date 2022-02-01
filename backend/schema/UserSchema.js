const mongoose = require('mongoose')
const bcrypt = require('bcryptjs') // Avoid working w/ plaintext

const collectionName = 'users' // Database table name

// FIXME WIP schema design
const userSchema = new mongoose.Schema({
	username : {type: String, required: true},
    passwordHash : {type: String, required: true},
    streakCounter : {type: mongoose.Number, required: true},
    points : {type: mongoose.Number, required: true}
});

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