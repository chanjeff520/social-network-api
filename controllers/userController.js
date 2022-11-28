/*
     getUsers, 
     createUser, 
     getSingleUser, 
     deleteUser, 
     updateUser, 
     addFriend,
     removeFriend
*/

const {ObjectId} = require('mongoose').Types;

const{User, Thought} = require("../models");

module.exports = {
    //get all users
    getUsers(req, res) {
        User.find()
        .then(async (users) => {
            const userObj = {
                users,
                friend_count: await User.friendCount
            }
            return res.json(userObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    //get a single user

    getSingleUser(req, res) {
        User.findOne({_id: req.params.user_id})
    }
}

