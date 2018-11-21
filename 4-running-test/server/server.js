const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

server.get('/hi', (req, res) => {
    res
        .status(404)
        .send({
            error: 'Page not found.'
        });
});

server.listen(3000, () => {
    console.log('Server is Up');
});

module.exports.server = server;