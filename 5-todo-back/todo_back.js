require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');


const {mongoose} = require('./db/mongoose');

const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const server = express();

server.use(bodyParser.json());

server.post('/todos', (req, res) => {
    const {title, text} = req.body;
    const todo = new Todo({ title, text });
    todo.save()
        .then((doc) => res.send(doc))
        .catch((e) => res.status(400).send(e));
});


server.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Working Todo Back over ${process.env.EXPRESS_PORT} port`);
});