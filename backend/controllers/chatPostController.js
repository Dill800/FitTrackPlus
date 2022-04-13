const ChatPost = require('../schema/ChatPostSchema.js')

module.exports = {

    getPosts: async (req, res, next) => {
        
        ChatPost.find({}, (err, posts) => {
            res.send(posts)
        })
    },
    create: async (req, res) => {

        ChatPost.create(req.body, (err, newPost) => {

            if(err){
                console.log(err);
                res.send({success: 0, message: "ERROR: New user could not be added to database"})
            }

            // If newUser not null, the new user was successfully added to database 
            if(newPost){
                res.send({success: 1, message: "SUCCESS: added new chatpost to db", data: newPost})
            }
        })

    },

    addComment: async (req, res) => {

        ChatPost.findOneAndUpdate({_id: req.body.id}, {$push: {comments: req.body.commentData}}, (err, data) => {
            if(err) {
                console.log(err);
                res.send({success: 0});
                return;
            }

            if(data == null) {
                console.log('nothing happened...')
                res.send({success: 0});
                return;
            }
            
            res.send({success: 1, data: data})
        })  

    },

    youch: async (req, res) => {

        ChatPost.remove({}, (err, data) => {
            res.send({message: "Goodbye everything"})
        })

    }

}