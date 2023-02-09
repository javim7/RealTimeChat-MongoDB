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

// get all files
router.get('/', getFiles)

//get a single file login
router.get('/:email/:password', getFile)

//get a single file email
router.get('/:email', getFile)

//post a new file
router.post('/', createFile)

//delete a new file
router.delete('/:email', deleteFile)

//update a new file
router.patch('/:email', updateFile)

module.exports = router;