const { Binary, ObjectId, GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fileData: {
        data: Buffer,
        contentType: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('File', fileSchema);