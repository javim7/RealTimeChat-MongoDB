const File = require('../models/fileModel');
const mongoose = require('mongoose');

//get all messages
const getFiles = async (req, res) => {
    const files = await File.find({}).sort({ createdAt: -1 });

    res.status(200).json(files)
}

//get single message
const getFile = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID' })
    }

    const file = await File.findById(id)

    if (!file) {
        return res.status(404).json({ error: 'file not found' })
    }
    res.status(200).json(file)
}

//create new message
const createFile = async (req, res) => {
    const { name, userId, fileData } = req.body;

    console.log(req.body);

    //add to db
    try {
        const file = await File.create({ name, userId, fileData })
        res.status(200).json(file)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a message
const deleteFile = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID' })
    }

    const file = await File.findOneAndDelete({ _id: id })

    if (!file) {
        return res.status(404).json({ error: 'file not found' })
    }

    res.status(200).json(file)
}

//update a message
const updateFile = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID' })
    }

    const file = await File.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!file) {
        return res.status(404).json({ error: 'file not found' })
    }

    res.status(200).json(file)
}

module.exports = {
    createFile,
    getFiles,
    getFile,
    deleteFile,
    updateFile
}