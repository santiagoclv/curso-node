require("dotenv/config");
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const { getApodData } = require("./nasa-api");

const server = express();

const public_folder = path.join(__dirname, '../public');
const partials_folder = path.join(__dirname, '../views/partials');


// This could be located on helpers js files
hbs.registerHelper('getYear', () => (new Date()).getFullYear());
hbs.registerHelper('toUppercase', (text) => text.toUpperCase());


server.set('view engine', 'hbs');
hbs.registerPartials(partials_folder);

server.use(express.static(public_folder));
//https://expressjs.com/en/api.html#app.use
// Middelware funtions are executed in sequenzial order
// like a logger
server.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) console.error(err)
    });
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

// On maintenance servere -> example without next
// server.use((req, res, next) => {
//     res.send("Fine!");
// });

// specific route to middleware
// server.use('/howareyou', (req, res, next) => {
//     res.send("Fine!");
// });

// https://expressjs.com/en/api.html#app.get.method
server.get('', (request, response) => {
    /**
     *  request; contains all the data that comes with the request and information about it
     *  response; contains all the methods and information needed to response to the request.
     */
    const payload = {
        title : "Titulo home",
        wellcome : "Wellcome! a mi home puto."
    };

    response.render('index', payload, (err, html) => {
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
    response.render('about', payload, (err, html) => {
        if (err) {
            console.error(err);
        }
        response.send(html);
    });
  
});


// https://expressjs.com/en/api.html#res.render
server.get('/facts', (request, response) => {
    const payload = {
        header : "True Facts",
        facts: [
            {
                title: "Hola",
                body: "Bola"
            },
            {
                title: "Sola",
                body: "Gola"
            },
            {
                title: "Nola",
                body: "Chola"
            },
            {
                title: "Mola",
                body: "Tola"
            }
        ],
        paragraph : "Facts, Facts, Facts, Facts, Facts."
    };
    response.render('facts', payload, (err, html) => {
        if (err) {
            console.error(err);
        }
        response.send(html);
    });
});

// https://expressjs.com/en/api.html#res.render
server.get('/apod', async (request, response) => {
    const payload = await getApodData(request?.query);
    if(!payload){
        response.redirect("/apod")
    }
    payload.isImage = payload?.media_type === "image"
    response.render('apod', payload, (err, html) => {
        if (err) {
            console.error(err);
        }
        response.send(html);
    });
});

server.get('*', (request, response) => {
    response.render('404', {}, (err, html) => {
        if (err) {
            console.error(err);
        }
        response.send(html);
    })
});

const port = parseInt(process.env.PORT, 10) || 3000;
server.listen(port, () =>{
    console.log("Server is up and running on port: ", port)
} )