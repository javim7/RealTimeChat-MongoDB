const Chat = require('../models/chatModel');
const mongoose = require('mongoose');

//get all chats
const getChats = async (req, res) => {
    const chats = await Chat.find({}).sort({ createdAt: -1 });

    res.status(200).json(chats)
}

//get all messages between 2 emails
const getConversations = async (req, res) => {
    const { user, email } = req.params
    console.log('[chatController.js] getConversations');
    console.log(user);
    console.log(email);
    console.log(req.params);
    const chats = await Chat.aggregate([
        {
            $match: {
                $or: [
                    { user1: { $in: [user, email] }, user2: { $in: [user, email] } },
                ]
            }
        },
        {
            $unwind: "$messages"
        },
        {
            $sort: {
                "messages.createdAt": 1
            }
        },
        {
            $group: {
                _id: "$_id",
                messages: {
                    $push: "$messages"
                }
            }
        }
    ]);
    res.status(200).json(chats)
}


//get allnavbar chats previous given an email
const getChatsSender = async (req, res) => {
    const { email } = req.params
    console.log(email);
    const chats = await Chat.aggregate([
        {
            $match: {
                $or: [{ user1: email }, { user2: email }]
            }
        },
        {
            $project: {
                otherUser: {
                    $cond: [{ $eq: ["$user1", email] }, "$user2", "$user1"]
                }
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "otherUser",
                foreignField: "email",
                as: "otherUserInfo"
            }
        },
        {
            $unwind: "$otherUserInfo"
        },
        {
            $project: {
                _id: 0,
                email: "$otherUser",
                name: "$otherUserInfo.name"
            }
        }
    ]);


    res.status(200).json(chats)
}

//get single chat
const getChat = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID' })
    }

    const chat = await Chat.findById(id)

    if (!chat) {
        return res.status(404).json({ error: 'chat not found' })
    }
    res.status(200).json(chat)
}

//create new chat
const createChat = async (req, res) => {
    const { user1, user2, messages } = req.body;

    console.log("chatController.js");
    console.log("[server.js] con el metodo: POST");
    console.log(req.body);
    //add to db
    try {
        const chat = await Chat.create({ user1, user2, messages })
        res.status(200).json(chat)
    } catch (error) {
        res.status(400).json({ error: error.chat })
    }
}

//delete a chat
const deleteChat = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID' })
    }

    const chat = await Chat.findOneAndDelete({ _id: id })

    if (!chat) {
        return res.status(404).json({ error: 'chat not found' })
    }

    res.status(200).json(chat)
}

//update a chat
const updateChat = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID' })
    }

    const chat = await Chat.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!chat) {
        return res.status(404).json({ error: 'chat not found' })
    }

    res.status(200).json(chat)
}

module.exports = {
    createChat,
    getChats,
    getChat,
    deleteChat,
    updateChat,
    getChatsSender,
    getConversations
}