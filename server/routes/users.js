const { application } = require('express');
const express = require('express');

const {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
} = require('../controllers/userController')

const router = express.Router();

//get all users
router.get('/', getUsers)

//get a single user
router.get('/:id', getUser)

//post a new user
router.post('/', createUser)

//delete a new user
router.delete('/:id', deleteUser)

//update a new user
router.patch('/:id', updateUser)

module.exports = router;