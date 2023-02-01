const mongoose = require('mongoose');
const Message = require('../models/messageModel');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    user1: {
        type: String,
        required: true
    },
    user2: {
        type: String,
        required: true
    },
    messages:{
        type: [Message.schema]
    }
    
}, {timestamps: true})

module.exports = mongoose.model('Chat', chatSchema);