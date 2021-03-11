const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');

const port = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const public_folder = path.join(__dirname, '../public');

app.use(express.static(public_folder));

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.emit('message-server', "Welcome to the chat room!");

    socket.on('disconnect', () => {
        socket.broadcast.emit('message-server', "A user has left!")
    });

    // broadcast ot everyone but not me
    socket.broadcast.emit('message-server', "A new user has joined!");

    socket.on('send-location', ({latitude, longitude, timestamp}) => {
        // if I emit the event over io, it is broadcasted but if I use socket it will be only sent to the same conection.
        io.emit('message-server', `<a href="https://google.com/maps?q=${latitude},${longitude}">Location</a> AT ${new Date(timestamp)}`);
    });

    socket.on('message-chat', (msg, callback) => {

        const filter = new Filter();
        
        if(filter.isProfane(msg)){
            return callback(`${msg} contains a bad word`)
        } else {
            callback();
        }
        // if I emit the event over io, it is broadcasted but if I use socket it will be only sent to the same conection.
        io.emit('message-server', msg);
        
    });
});

server.listen(port, () =>{
    console.log("Chat server app is up and running on port: ", port)
} )