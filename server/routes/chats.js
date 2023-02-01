const { application } = require('express');
const express = require('express');

const {
    createChat,
    getChats,
    getChat,
    deleteChat,
    updateChat
} = require('../controllers/chatController')

const router = express.Router();

//get all Chats
router.get('/', getChats)

//get a single Chat
router.get('/:id', getChat)

//post a new Chat
router.post('/', createChat)

//delete a new Chat
router.delete('/:id', deleteChat)

//update a new Chat
router.patch('/:id', updateChat)

module.exports = router;