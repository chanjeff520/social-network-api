const router = require('express').Router();
const {
     getThoughts, 
     getSingleThought, 
     createThought, 
     updateThought, 
     deleteThought, 
     addReaction,
     removeReaction
    } = require('../../controllers/thoughtController');

//get all thought or create new thought
router.route('/').get(getThoughts).post(createThought);

//get a single thought, delete a thought, or update a thought
router.route('/:thought_id').get(getSingleThought).delete(deleteThought).put(updateThought);

/* ------------------------ Reaction Routes -------------------------------- */

//add or remove a reaction from the reactionlist in the thought model
router.route('/:thought_id/reactions/:reaction_id').post(addReaction).delete(removeReaction);

module.exports = router