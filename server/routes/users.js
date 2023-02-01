const { application } = require('express');
const User = require('../models/userModel');
const express = require('express');

const router = express.Router();

//get all users
router.get('/', (req, res)=>{
    res.json({mssg: 'GET all users'})
})

//get a single user
router.get('/:id', (req, res)=>{
    res.json({mssg: 'GET a single user'})
})

//post a new user
router.post('/', async (req, res)=>{
    const {email, password, name, age} = req.body;

    try {
        const user = await User.create({email, password, name, age})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//delete a new user
router.delete('/:id', (req, res)=>{
    res.json({mssg: 'DELETE a user'})
})

//update a new user
router.patch('/:id', (req, res)=>{
    res.json({mssg: 'UPDATE a user'})
})

module.exports = router;