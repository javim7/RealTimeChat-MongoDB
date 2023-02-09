const User = require('../models/userModel');
const mongoose = require('mongoose');

//get all users
const getUsers = async (req, res) => {

    const users = await User.find({}).sort({ createdAt: -1 });

    console.log('[userController.js] getUsers: ', users)

    res.status(200).json(users)
}

//get login information
const getUser = async (req, res) => {

    const { email, password } = req.params

    const user = await User.findOne({
        email: email,
        password: password
    })

    if (!user) {

        console.log('[userController.js] getUser: ', user)

        return res.status(404).json({ error: 'Credenciales incorrectas!' })
    }

    console.log('[userController.js] getUser: ', user)
    res.status(200).json(user)
}

//get single user by email
const getUserEmail = async (req, res) => {
    const { email } = req.params

    const user = await User.findOne({ email: email })

    if (!user) {

        console.log('[userController.js] getUser: ', user)

        return res.status(404).json({ error: 'Correo incorrecto!' })
    }

    console.log('[userController.js] getEmail: ', user)
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
    const { email } = req.params

    const user = await User.findOneAndDelete({ email: email })

    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json(user)
}

//update a user
const updateUser = async (req, res) => {
    const { email } = req.params
    const { name, username, password } = req.body

    console.log('[chatController.js] updateUser');
    console.log(req.params);
    console.log(req.body);


    const user = await User.updateOne(
        { email: email },
        {
            $set: {
                name: name,
                username: username,
                password: password
            }
        }
    )

    if (email === undefined || name === undefined || username === undefined || password === undefined) {
        return res.status(404).json({ error: 'fields not completed' })
    }

    res.status(200).json(user)
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    getUserEmail
}