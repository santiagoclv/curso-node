const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');

const { getUser, removeUser, addUser, delAll, getUsersInRoom } = require('./users');

delAll();

const port = process.env.PORT;
 
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const public_folder = path.join(__dirname, '../public');

app.use(express.static(public_folder));

function createPayload(value) {
    return { value, timestamp: Date.now() }
}

io.on('connection', (socket) => {

    socket.on('disconnect', async () => {
        const user = await removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message-metadata-server', createPayload(`${user.nickname} has left!`))
        }
    });

    socket.on('join', async ({ nickname, room }, callback) => {
        const { error , user } = await addUser({ id: socket.id, nickname, room });
        
        if(error){
            return callback(error);
        }


        socket.join(user.room);

        socket.emit('message-metadata-server', createPayload(`Welcome to the ${user.room}!`));
        socket.broadcast.to(user.room).emit('message-metadata-server', createPayload(`${user.nickname} has joined!`));
        io.to(user.room).emit('user-list-server', await getUsersInRoom(room))
        callback();

        // socket.emit: sends messages to this client
        // io.emit: sends messages to every conected client.
        // socket.broadcast.emit: broadcast ot everyone but not me
        // io.to("room").emit: sends messages to every conected client in a specific room.
        // socket.broadcast.to("room").emit: broadcast ot everyone but not me in a specific room.
    })

    socket.on('send-location', async ( payload, callback) => {
        const user = await getUser(socket.id);
        // if I emit the event over io, it is broadcasted but if I use socket it will be only sent to the same conection.
        io.to(user.room).emit('message-server',  {user, ...payload});
        callback();
    });

    socket.on('message-chat', async (payload, callback) => {
        const user = await getUser(socket.id);
        const filter = new Filter();
        
        if(filter.isProfane(payload.value)){
            return callback(`${payload.value} contains a bad word`)
        } else {
            callback();
        }
        // if I emit the event over io, it is broadcasted but if I use socket it will be only sent to the same conection.
        io.emit('message-server', {user, ...payload});
        
    });
});

server.listen(port, () =>{
    console.log("Chat server app is up and running on port: ", port)
} )