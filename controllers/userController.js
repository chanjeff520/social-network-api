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
        .select('-__v')
        .then(async (user) => {
            !user 
            ? res.status(404).json({message: 'No User found with that ID'})
            : res.json({
                student,
                friend_count: await User.friendCount
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    //create a new User
    createUser(req, res){
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            res.status(500).json(err);
        });
    },

    //updating a User
    updateUser(req, res){
        User.findOneAndUpdate(
            {_id: req.params.courseID},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((user) => {
            !user
            ? res.status(404).json({message: 'No user find with that ID'})
            : res.json(user);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },

    //delete a User
    deleteUser(req,res) {
        User.findOneAndDelete({_id: req.params.user_id})
        .then((user) => {
            !user
            ? res.status(404).json({ message: 'No user find with that ID'})
            : Thought.deleteMany({ _id: {$in : user.thoughts}})
        })
        .then(() => res.json({message: 'User and it\'s associated thoughts deleted'}))
        .catch((err) => {
            res.status(500).json(err);
        });
    },


    /* ----------- Friend Routes Functions ------------- */

    // to add a new friend to a specific user
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.user_id},
            {$addToSet: {friends: req.params.friend_id}},
            {runValidators: true, new:true}
        )
        .then((user) => {
            !user
            ? res.status(404).json({message: 'No user found with that ID'})
            : res.json(user);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },

    //remove a specific friend from a specific user
    removeFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.user_id},
            {$pull: {friend: {friend_id: req.params.friend_id}}},
            {runValidators: true, new: true}
        )
        .then((user) => {
            !user
            ? res.status(404).json({message: 'No user found with that ID'})
            : res.json(user);
        })
        .catch((err) => res.status(500).json(err));
    }

}

