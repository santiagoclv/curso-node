const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const hbs = require('hbs');
//const fs = require('fs');


admin.initializeApp(functions.config().firebase);

const cloudStore = admin.firestore();

const settings = {timestampsInSnapshots: true};
cloudStore.settings(settings);

const server = express();

hbs.registerPartials(__dirname + '/views/partials');
// https://expressjs.com/en/api.html#app.set
server.set('view engine', 'hbs');

hbs.registerHelper('getYear', () => (new Date()).getFullYear());
hbs.registerHelper('toUppercase', (text) => text.toUpperCase());

//https://expressjs.com/en/api.html#app.use
// Middelware funtions are executed in sequenzial order
// like a logger
server.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    // fs.appendFile('server.log', log + '\n', (err) => {
    //     if (err) console.error(err)
    // });
    next();
});

// Caching Feture on the middleware setup
server.use((req, res, next) => {
    // if it is private, it will be only storage in the user's browser
    // max-age: how long it will be storage in the user's browser
    // s-maxage: how long it'll be storage in the cdn
    res.set('Cache-control','public, max-age=300, s-maxage=600');
    next();
});

// on maintenance example without next
// server.use((req, res, next) => {
//     res.send("Fine!");
// });

// specific route to middleware
server.use('/howareyou', (req, res, next) => {
    res.send("Fine!");
});

//server.use(express.static(__dirname + '/public'));

// https://expressjs.com/en/api.html#app.get.method
server.get('/', (request, response) => {
    /**
     *  request; contains all the data that comes with the request and information about it
     *  response; contains all the methods and information needed to response to the request.
     */
    const payload = {title : "Titulo home",
        wellcome : "Wellcome! a mi home puto."
    };

    response.render('home.hbs', payload, (err, html) => {
        if (err) {
            console.error(err);
        }
        response.send(html);
    });
});

// https://expressjs.com/en/api.html#res.render
server.get('/about', (request, response) => {
    const payload = {
        title : "Titulo About",
        header : "Hola esto es el about",
        paragraph : "About, About, About, About, About."
    };
    // if a callback is specified, the rendered HTML string has to be sent explicitly
    response.render('about.hbs', payload, (err, html) => {
        if (err) {
            console.error(err);
        }
        response.send(html);
    });
  
});


// https://expressjs.com/en/api.html#res.render
server.get('/facts', (request, response) => {
    cloudStore.collection('facts').get()
        .then((snapshot) => {
            let facts = [];
            snapshot.forEach((doc) => {
                facts.push(doc.data());
            });
            const payload = {
                header : "True Facts",
                facts,
                paragraph : "Facts, Facts, Facts, Facts, Facts."
            };

            // if a callback is specified, the rendered HTML string has to be sent explicitly
            response.render('facts.hbs', payload, (err, html) => {
                if (err) {
                    console.error(err);
                }
                response.send(html);
            });
        })
        .catch((err) => {
            console.error('Error getting documents', err);
            response.sendStatus(404);
        });
  
});

// second param optional, callback that is call when the server is up and running.
//https://expressjs.com/en/api.html#app.listen
// server.listen(3000, () => {
//     console.log("Web Server Running on port 3000");
// });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.server = functions.https.onRequest(server);