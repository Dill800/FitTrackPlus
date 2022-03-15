const express = require('express') // Middleware
const mongoose = require('mongoose') // DB Connection
const morgan = require('morgan') // Logger
// const path = require('path') // Connect to frontend

// Imports for routing (controllers inside routes, only need router import here)
const userRouter = require('./routes/userRouter')

// Use env port or default
const port = process.env.PORT || 5000;
const server = express();
server.use(morgan('dev'));
server.use(express.json());

// Routes for backend only
server.use('/user', userRouter)

// Deployment DB URI first priority, then take config file
mongoose.connect(process.env.MONGODB_URI || require('./config/config').db.uri, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Database Connection Successful");
});

// // Need more research into EXPO building 
// if (process.env.NODE_ENV === 'production') {

//     // Serve any static files
//     server.use(express.static(path.join(__dirname, '../client/build')));

//     // Handle React routing, return all requests to React server
//     server.get('*', function(req, res) {
//         res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
//     });
// }

// test comment

server.listen(port, () => console.log(`Server now running on port ${port}!`));
