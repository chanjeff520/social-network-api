const router = require('express').Router;

//get all user or create new user
router.route('/').get(getUsers).post(createUser);

//get a single user, delete a user, or update a user
router.route('/:user_id').get(getSingleUser).delete(deleteUser).put("updateUser");

