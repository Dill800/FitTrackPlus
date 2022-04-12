const express = require('express')
const chatPostRouter = new express.Router()
const chatPostController = require('../controllers/chatPostController')

// Creating a new account, check if its exists, then create if not exists
chatPostRouter.get('/getPosts', chatPostController.getPosts)
chatPostRouter.post('/create', chatPostController.create)
chatPostRouter.post('/newComment', chatPostController.addComment)

module.exports = chatPostRouter