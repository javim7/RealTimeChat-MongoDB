require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const http = require('http');
const { Server } = require('socket.io');

//routes
const userRoutes = require('./routes/users');
const chatRoutes = require('./routes/chats');
const messageRoutes = require('./routes/messages');

// ignorar warning:
mongoose.set("strictQuery", false);

//express app
const app = express();
const cors = require('cors');

//middleware
app.use(express.json())
app.use(cors());

app.use((req, res, next) => {
    console.log('')
    console.log('[server.js] Se ha accedido a la ruta: ', req.path)
    console.log('[server.js] Con el método: ', req.method)
    next();
})

//routes
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for request
        app.listen(process.env.PORT, () => {
            console.log('[server.js] Conetado a la base de datos y escuchando en el puerto: ', process.env.PORT)
        });
    })
    .catch((error) => {
        console.log('[server.js] Error al conectar con la base de datos: ', error)
    })



