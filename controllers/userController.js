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
    }
}

