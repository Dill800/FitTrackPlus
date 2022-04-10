const WorkoutLog = require('../schema/WorkoutLogSchema')

module.exports = {

    createWorkoutLog: async (req, res, next) => {
        
        console.log(req.body)
        WorkoutLog.create(req.body, (err, workoutlog) => {
            if(err){
                console.log(err);
                res.send({success: 0, message: "ERROR: New workoutlog could not be added to database"})
            }

            // If newUser not null, the new user was successfully added to database 
            if(workoutlog){
                res.send({success: 1, message: "SUCCESS: New workoutlog added to database"})
            }
        });
    },
}