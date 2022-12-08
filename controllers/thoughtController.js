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
    //get all thoughts and their reactions
    getThoughts(req, res) {
        Thought.find()
        .then(async (thoughts) => {
            const thoughtObj = {
                thoughts,
                reaction_count: await thoughts.reactionCount
            }
            return res.json(thoughtObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    //get a single thought
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thought_id})
        .select('-__v')
        .then(async (thought) => {
            !thought 
            ? res.status(404).json({message: 'No thought found with that ID'})
            : res.json({
                thought,
                reaction_count: await Thought.reactionCount
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    //create a new thought
    createThought(req, res){
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => {
            res.status(500).json(err);
        });
    },

    //updating a thought
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

    //delete a thought
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


    /* ----------- Reaction Routes Functions ------------- */

    // to add a new reaction to a specific thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thought_id},
            {$addToSet: {reactions : req.body}},
            {runValidators: true, new:true}
        )
        .then((thought) => {
            !thought
            ? res.status(404).json({message: 'No thought found with that ID'})
            : res.json(thought);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },

    //remove a specific reaction from a specific thought
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thought_id},
            {$pull: {thought: {reaction_id: req.params.reaction_id}}},
            {runValidators: true, new: true}
        )
        .then((thought) => {
            !thought
            ? res.status(404).json({message: 'No thought found with that ID'})
            : res.json(thought);
        })
        .catch((err) => res.status(500).json(err));
    }

}

