const mongoose = require('mongoose')
const bcrypt = require('bcryptjs') // Avoid working w/ plaintext

const collectionName = 'chatpost' // Database table name

const chatPostSchema = new mongoose.Schema({
    title : {type: String, required: true},
    body : {type: String, required: true},
    username : {type: String, required: true},
    comments : {type: [{
        comment: {type: String, required: true},
        username: {type: String, required: true},
        date: {type: Date, required: true},
    }], required: true, default: []},
    groupName: {type: String, required: true}
}, {timestamps: true});

var ChatPost = mongoose.model(collectionName, chatPostSchema);
module.exports = ChatPost