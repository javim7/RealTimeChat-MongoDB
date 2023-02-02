const User = require('../models/userModel');
const mongoose = require('mongoose');

//get all users
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 });

    res.status(200).json(users)
}

//get single user
const getUser = async (req, res) => {
    const { email } = req.params

    // if(!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(404).json({error: 'Invalid ID'})
    // }

    console.log(email);
    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(404).json({ error: 'email not found' })
    }
    res.status(200).json(user)
}

//create new user
const createUser = async (req, res) => {
    const { name, email, username, password } = req.body;

    //add to db
    try {
        const user = await User.create({ name, email, username, password })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID' })
    }

    const user = await User.findOneAndDelete({ _id: id })

    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json(user)
}

//update a user
const updateUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID' })
    }

    const user = await User.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json(user)
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
}