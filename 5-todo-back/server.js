require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const { ObjectID } = require('mongodb');

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

server.get('/todos/:id', (req, res) => {
    const { id } = req.params;

    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }

    Todo.findById(id)
        .then( todo => {
            if(!todo) res.status(404).send();
            res.send({ todo });
        })
        .catch( e => res.status(400).send({ error: e }));
});

server.get('/todos', (req, res) => {
    Todo.find()
        .then( todos => res.send({ todos }))
        .catch( e => res.status(400).send({ error: e }));
});

server.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Working Todo Back over ${process.env.EXPRESS_PORT} port`);
});

module.exports = {server}