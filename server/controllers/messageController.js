const Message = require('../models/messageModel');
const mongoose = require('mongoose');

//get all messages
const getMessages = async (req, res) => {
    const messages = await Message.find({}).sort({ createdAt: -1 });

    res.status(200).json(messages)
}

//get single message
const getMessage = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid ID'})
    }

    const message = await Message.findById(id)

    if(!message) {
        return res.status(404).json({error: 'message not found'})
    }
    res.status(200).json(message)   
}

//create new message
const createMessage = async (req, res) => {
    const {sender, message} = req.body;

    //add to db
    try {
        const message = await Message.create({sender, message})
        res.status(200).json(message)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a message
const deleteMessage = async (req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid ID'})
    }

    const message = await Message.findOneAndDelete({_id: id})

    if(!message) {
        return res.status(404).json({error: 'message not found'})
    }

    res.status(200).json(message)
}

//update a message
const updateMessage = async (req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid ID'})
    }

    const message = await Message.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!message) {
        return res.status(404).json({error: 'message not found'})
    }

    res.status(200).json(message)
}

module.exports = {
    createMessage,
    getMessages,
    getMessage,
    deleteMessage,
    updateMessage
}