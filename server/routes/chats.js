const { application } = require('express');
const express = require('express');

const {
    createChat,
    getChats,
    getChat,
    deleteChatsByEmail,
    updateChat,
    getChatsSender,
    getConversations,
    getSentCount,
    getReceivedCount,
    getActiveChats,
    getTop5Contacts
} = require('../controllers/chatController')

const router = express.Router();

//get all Chats
router.get('/', getChats)

//get a single Chat
// router.get('/:id', getChat)

//get all Chats where user1 or user2 is email
router.get('/:email', getChatsSender)

//get sent count for a user
router.get('/count/sent/:email', getSentCount)

//get received count for a user
router.get('/count/received/:email', getReceivedCount)

//get chats count for a user
router.get('/count/active/:email', getActiveChats)

//get top 5 contacts for a user
router.get('/top/contacts/:email', getTop5Contacts)

//get conversations between two users
router.get('/:user/:email', getConversations)

//post a new Chat
router.post('/', createChat)

// post a new message with a given chat id
router.patch('/:id', updateChat)


//delete a chat with the email
router.delete('/:email', deleteChatsByEmail)

// //update a new Chat
// router.patch('/:id', updateChat)

module.exports = router;