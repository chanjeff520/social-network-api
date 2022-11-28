/*
     getThoughts, 
     getSingleThought, 
     createThought, 
     updateThought, 
     deleteThought, 
     addReaction,
     removeReaction
*/

const {ObjectId} = require('mongoose').Types;

const{User, Thought} = require("../models");

module.exports = {
    //get all users
    getThoughts(req, res) {
        Thought.find()
        .then(async (thoughts) => {
            const userObj = {
                thoughts,
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
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thought_id})
        .select('-__v')
        .then(async (thought) => {
            !thought 
            ? res.status(404).json({message: 'No thought found with that ID'})
            : res.json({
                thought,
                reaction_count: await User.reactionCount
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    //create a new User
    createThought(req, res){
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => {
            res.status(500).json(err);
        });
    },

    //updating a User
    updateThought(req, res){
        Thought.findOneAndUpdate(
            {_id: req.params.thought_id},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((thought) => {
            !thought
            ? res.status(404).json({message: 'No thought find with that ID'})
            : res.json(thought);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },

    //delete a User
    deleteThought(req,res) {
        Thought.findOneAndDelete({_id: req.params.thought_id})
        .then((thought) => {
            !thought
            ? res.status(404).json({ message: 'No thought find with that ID'})
            : User.findOneAndUpdate(
                {thoughts: req.params.thought_id},
                {$pull: {thoughts: req.params.thought_id}},
                {new:true}
                )
        })
        .then((thought) => {
            !thought
            ? res.status(404).json({message: 'Thought delete, but no User found'})
            : res.json({message: 'Thought successfully deleted'});
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },


    /* ----------- Friend Routes Functions ------------- */

    // to add a new friend to a specific user
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thought_id},
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

