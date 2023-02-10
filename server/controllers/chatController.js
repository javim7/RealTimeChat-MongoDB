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

//get number of sent messages with a given email
const getSentCount = async (req, res) => {
    const { email } = req.params;
    console.log("aqui estoy");
    const chats = await Chat.aggregate(
        [
            {
                $match: {
                    "messages.sender": email
                }
            },
            {
                $unwind: "$messages"
            },
            {
                $match: {
                    "messages.sender": email
                }
            },
            {
                $group: {
                    "_id": "$messages.sender",
                    "count": {
                        $sum: 1
                    }
                }
            }
        ]
    )
    if (!chats) {
        return res.status(404).json({ error: 'email not found' })
    }
    res.status(200).json(chats)
}

//get number of recived messages with a given email
const getReceivedCount = async (req, res) => {
    const { email } = req.params;
    console.log("aqui estoy");
    const chats = await Chat.aggregate(
        [
            {
                $match: {
                    "messages.receiver": email
                }
            },
            {
                $unwind: "$messages"
            },
            {
                $match: {
                    "messages.receiver": email
                }
            },
            {
                $group: {
                    "_id": "$messages.receiver",
                    "count": {
                        $sum: 1
                    }
                }
            }
        ]
    )
    if (!chats) {
        return res.status(404).json({ error: 'email not found' })
    }
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

//get number of active chats
const getActiveChats = async (req, res) => {
    const { email } = req.params

    const chats = await Chat.aggregate(
        [
            {
                $match: {
                    $or: [
                        { user1: email },
                        { user2: email }
                    ]
                }
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 }
                }
            }
        ]
    )
    if (!chats) {
        return res.status(404).json({ error: 'chat not found' })
    }
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
    const { user1, user2, messages, sender, reciever, message } = req.body;
    console.log(req.body);
    const item = {
        user1: user1,
        user2: user2,
        messages: [
            {
                sender: user1,
                receiver: user2,
                message: messages[0].message
            }
        ]

    }
    console.log(item);
    //add to db
    try {
        const chat = await Chat.create(item)
        res.status(200).json(chat)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete all chats given an email
const deleteChatsByEmail = async (req, res) => {
    const { email } = req.params


    const chat = await Chat.deleteMany({ $or: [{ user1: email }, { user2: email }] })

    if (!chat) {
        return res.status(404).json({ error: 'chat not found' })
    }

    res.status(200).json(chat)
}

//update a chat
const updateChat = async (req, res) => {
    const { id, message_sender, message_reciever, message_content } = req.body

    console.log('[chatController.js] updateChat');
    console.log(req.body);


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID' })
    }

    // const chat = await Chat.findOneAndUpdate({ _id: id }, {
    //     ...req.body
    // })

    const chat = await Chat.updateOne(
        { "_id": id },
        {
            $push: {
                "messages":
                {

                    "sender": message_sender,
                    "receiver": message_reciever,
                    "message": message_content
                }

            }
        }
    )

    if (!chat) {
        return res.status(404).json({ error: 'chat not found' })
    }

    res.status(200).json(chat)
}

//get top 5 contacts
const getTop5Contacts = async (req, res) => {
    const { email } = req.params;

    const chats = await Chat.aggregate(
        [
            {
                $match: {
                    $or: [
                        { user1: email },
                        { user2: email }
                    ]
                }
            },
            {
                $project: {
                    otherUser: {
                        $cond: [
                            { $eq: ["$user1", email] },
                            "$user2",
                            "$user1"
                        ]
                    },
                    messageCount: { $size: "$messages" }
                }
            },
            { $sort: { messageCount: -1 } },
            { $limit: 5 }
        ]
    )
    if (!chats) {
        return res.status(404).json({ error: 'chat not found' })
    }

    res.status(200).json(chats)
}


module.exports = {
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
}