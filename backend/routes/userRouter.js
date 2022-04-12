const express = require('express')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const userRouter = new express.Router()
const userController = require('../controllers/userController')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

// Creating a new account, check if its exists, then create if not exists
userRouter.get('/get', userController.getUser)
userRouter.get('/listGroupMembers', userController.listGroupMembers)
userRouter.post('/register', userController.exists, userController.create)
userRouter.post('/login', userController.authenticate)
userRouter.post('/addFriend', userController.addFriend)
userRouter.post('/removeFriend', userController.removeFriend)
userRouter.post('/joinGroup', userController.joinGroup)
userRouter.post('/checkIn', userController.checkIn)
userRouter.post('/addExercise', userController.addExercise)
userRouter.post('/removeExericse', userController.removeExercise)
userRouter.post('/addWeight', userController.addWeight)
userRouter.get('/getWeightLog', userController.getWeightLog)
userRouter.post('/addPfp', upload.single('photo'), userController.addPfp)
userRouter.post('/updateGoalWeight', userController.updateGoalWeight)

// Logging in as an existing user
// userRouter.post('/login', userController.authenticate)

module.exports = userRouter