const User = require('../schema/UserSchema.js')
// const signToken = require('../authFuncts').signToken;

module.exports = {

    // Query DB and find if a user already exists using their email address
    exists: async (req, res, next) => {
        
        User.findOne({email: req.body.username}, (err, user) => {

            if(err){
                console.log(err);
                res.send({success: 0, message: 'ERROR: Query for user by username could not be completed'});
            }

            // If user not null, there was a matching entry returned by the database query
            if(user){
                res.send({success: 0, message: 'ERROR: User w/ provided username already exists!'});
            }

            else{
                next();
            }
        });
    },

    retrieve: async (req, res) => {

        console.log("Retrieving user with username ", req.user);


    },

    // Add entry for a new user to the DB
    create: async (req, res) => {


        console.log("Attempting to add new user to database ...")
        console.log(req.body)

        User.create(req.body, (err, newUser) => {

            if(err){
                console.log(err);
                res.send({success: 0, message: "ERROR: New user could not be added to database"})
            }

            // If newUser not null, the new user was successfully added to database 
            if(newUser){
                res.send({success: 1, message: "SUCCESS: New user with username " + newUser.email + " added to database"})
            }
        })

    },

    authenticate: async (req, res) => {

    }
}