const router = require('express').Router();
const {
     getUsers, 
     createUser, 
     getSingleUser, 
     deleteUser, 
     updateUser, 
     addFriend,
     removeFriend
    } = require('../../controllers/userController');

//get all user or create new user
router.route('/').get(getUsers).post(createUser);

//get a single user, delete a user, or update a user
router.route('/:user_id').get(getSingleUser).delete(deleteUser).put(updateUser);

/* ------------------------ Friend Routes -------------------------------- */

//add or remove a friend from the friendlist in the user model
router.route('/:user_id/friends/:friend_id').post(addFriend).delete(removeFriend);

module.exports = router