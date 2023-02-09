const { application } = require('express');
const express = require('express');

const {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    getUserEmail
} = require('../controllers/userController')

const router = express.Router();

//get all users
router.get('/', getUsers)

//get a single user login
router.get('/:email/:password', getUser)

//get a single user email
router.get('/:email', getUserEmail)

//post a new user
router.post('/', createUser)

//delete a new user
router.delete('/:email', deleteUser)

//update a new user
router.patch('/:email', updateUser)

module.exports = router;