const { application } = require('express');
const express = require('express');

const {
    createMessage,
    getMessages,
    getMessage,
    deleteMessage,
    updateMessage
} = require('../controllers/messageController')

const router = express.Router();

//get all Messages
router.get('/', getMessages)

//get a single Message
router.get('/:id', getMessage)

//post a new Message
router.post('/', createMessage)

//delete a new Message
router.delete('/:id', deleteMessage)

//update a new Message
router.patch('/:id', updateMessage)

module.exports = router;