const User = require('../schema/UserSchema.js')

module.exports = {

    getUser: async (req, res, next) => {
        
        User.findOne({username: req.query.username}, (err, user) => {
            res.send(user)
        });
    },

    exists: async (req, res, next) => {
        
        User.findOne({username: req.body.username}, (err, user) => {

            if(err){
                console.log(err);
                res.send({message: 'ERROR: Query for user by username could not be completed'});
            }

            // If user not null, there was a matching entry returned by the database query
            if(user){
                res.send({exists: true, message: 'ERROR: User w/ provided username already exists!', user: user});
            }

            else{
                console.log("username does not exist")
                //res.send({exists: false, message: "Username is available / does not exist"})
                next();
            }
        });
    },

    // Add entry for a new user to the DB
    create: async (req, res) => {

        User.create(req.body, (err, newUser) => {

            if(err){
                console.log(err);
                res.send({success: 0, message: "ERROR: New user could not be added to database"})
            }

            // If newUser not null, the new user was successfully added to database 
            if(newUser){
                res.send({success: 1, message: "SUCCESS: New user added to database"})
            }
        })

    },

    authenticate: async (req, res) => {

        User.findOne({username: req.body.username}, (err, user) => {

            if(err) {
                console.log(err);
                res.send();
            }

            if(!user) {
                res.send({success: 0, message: "Email Doesn't Exist"});
                return;
            }

            else if(!user.checkPassword(req.body.password)) {
                res.send({success: 0, message: "Invalid Password"});
            }

            else {
                res.send({success: 1, message: "User logged in (correct password)", user: user})
            }

        })

    },

    addFriend: async (req, res) => {

        // friend username in req.body.friendUser
        User.findOne({username: req.body.friendUser}, (err, user) => {

            if(err){
                console.log(err);
                res.send({message: 'ERROR: finding friend failed'});
            }

            // If user not null, there was a matching entry returned by the database query
            if(user){
                
                User.findOneAndUpdate({username: req.body.username}, {$push: {friendList: req.body.friendUser}}, (err, data) => {
                    if(err) {
                        console.log(err);
                        res.send({success: 0});
                    }
                    
                    res.send({success: 1, data: data})
                })

            }

            else{
                res.send({success: 0, message: "friend does not exist"})
            }
        });
        

    },

    removeFriend: async (req, res) => {

        // gotta add in stuff for when friend to remove is not a friend
        // that can be taken care of in front end for now

        User.findOneAndUpdate({username: req.body.username}, {$pull: {friendList: req.body.friendUser}}, (err, data) => {
            if(err) {
                console.log(err);
                res.send({success: 0});
            }
            
            res.send({success: 1, data: data})
        })
        

    },

    joinGroup: async (req, res) => {

        User.findOneAndUpdate({username: req.body.username}, {groupName: req.body.groupName}, (err, data) => {
            if(err) {
                console.log(err);
                res.send({success: 0});
            }
            
            res.send({success: 1, data: data})
        })

    },

    listGroupMembers: async(req, res) => {
        //console.log(req.body.username);
        //console.log(req.body.groupName);
        User.find({groupName: req.query.groupName}, (err, data) => {
            if(err) {
                console.log(err);
                res.send({success: 0});
            }
            
            res.send({success: 1, data: data})
        })
            
        
    },

    checkIn: async (req, res) => {

        User.findOne({username: req.body.username}, (err, user) => {

            if(err) {
                console.log(err);
                res.send();
            }

            console.log(user.lastCheckIn.getTime())

            // outside of day  86400000
            if(Date.now() - user.lastCheckIn.getTime() >= 86400000) {
                
                User.findOneAndUpdate({username: req.body.username}, {lastCheckIn: Date.now(), $inc: {streakCounter: 1}}, (err, data) => {
                    if(err) {
                        console.log(err)
                    }
                });

                res.send({success: 1, checkIn: true, message: "streak should be incremented"})
                // add to streak

            }
            else {
                // within a day
                res.send({success: 1, checkIn: false, message: "within a day so nothing happens"})
            }


        })

    },

    // Needs updating, for now just add the exercise in as a string
    addExercise: async (req, res) => {

        User.findOneAndUpdate({username: req.body.username}, {$push: {exerciseList: req.body.exercise}}, (err, data) => {
            if(err) {
                console.log(err);
                res.send({success: 0});
            }
            
            res.send({success: 1, data: data})
        })        

    },

    removeExercise: async (req, res) => {

        User.findOneAndUpdate({username: req.body.username}, {$pull: {exerciseList: req.body.exercise}}, (err, data) => {
            if(err) {
                console.log(err);
                res.send({success: 0});
            }
            
            res.send({success: 1, data: data})
        })

    },

    addWeight: async (req, res) => {

        User.findOneAndUpdate({username: req.body.username}, {$push: {weightList: {weight: req.body.weight, date: Date.now()}}}, (err, data) => {
            if(err) {
                console.log(err);
                res.send({success: 0});
            }
            
            res.send({success: 1, data: data})
        })        

    },

    addPfp: async (req, res) => {
        User.findOneAndUpdate({username: req.body.username}, {pfpFilepath: req.file}, (err, data) => { 
            if(err) {
                console.log(err);
                res.send({success: 0});
            }
            
            res.send({success: 1, data: data})
        })        
    }

}