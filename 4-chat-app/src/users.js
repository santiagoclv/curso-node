

// addUser, removeUser, getUser, getUsersInRoom

const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient();

// redis do not support promises
const get = promisify(client.get).bind(client);

client.on("error", function(error) {
    console.error(error);
});

function delAll() {
    client.flushall()
}

async function addUser({ id, nickname, room }) {
    const username = nickname?.trim()?.toLowerCase() ?? "";
    const roomname = room?.trim()?.toLowerCase() ?? "";

    if( !username || !roomname ){
        return {
            error: "room and nickname are required!"
        }
    }

    const userAlreadyInRoom = (await getUsersInRoom(roomname) ?? []).filter( ({nickname}) => nickname === username);

    if(userAlreadyInRoom.length > 0){
        return {
            error: "User already in room!"
        }
    }

    client.set(id, JSON.stringify({ nickname: username, room: roomname }));
    const roomUsers = JSON.parse(await get(roomname) ?? "[]");
    roomUsers.push({ id, nickname })
    client.set(roomname, JSON.stringify(roomUsers));
    return {
        error: null,
        user: { id, nickname: username, room: roomname }
    }
}

async function removeUser(id) {
    const user = await getUser(id);
    client.del(id);
    const roomUsers = JSON.parse(await get(user.room) ?? "[]").filter( user => user.id !== id );
    client.set(user.room, JSON.stringify(roomUsers));
    return user;
}

async function getUser(id) {
    return JSON.parse(await get(id) ?? "null");
}

async function getUsersInRoom(room) {
    return JSON.parse(await get(room) ?? "[]");
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
    delAll
}