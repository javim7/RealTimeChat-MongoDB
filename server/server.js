require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

//routes
const userRoutes = require('./routes/users');
const chatRoutes = require('./routes/chats');
const messageRoutes = require('./routes/messages');

//express app
const app = express();
const cors = require('cors');

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//routes
app.use('/api/users',userRoutes);
app.use('/api/chats',chatRoutes);
app.use('/api/messages',messageRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        //listen for request
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT)
        });
    })
    .catch((error) => {
        console.log('error connecting to db', error)
    })



