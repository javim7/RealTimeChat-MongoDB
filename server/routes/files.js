const { application } = require('express');
const express = require('express');

const {
    createFile,
    getFiles,
    getFile,
    deleteFile,
    updateFile
} = require('../controllers/fileController')

const router = express.Router();

// get all users
router.get('/', getFiles)

//get a single user login
router.get('/:email/:password', getFile)

//get a single user email
router.get('/:email', getFile)

//post a new user
router.post('/', createFile)

//delete a new user
router.delete('/:email', deleteFile)

//update a new user
router.patch('/:email', updateFile)

module.exports = router;