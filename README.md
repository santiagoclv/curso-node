# CursoNode

## First - Notes app

* Simple r and w over the fs using node and a overview over debugging an app
* Creation of command line app with arguments

### To start debug mode.
```node inspect app.js```
 
```nodemon inspect app.js```

``` 
 * In debug mode press:
 * "c" continue
 * "n" go to next line
 * "repl" start console like Chrome Dev Tool

 * In the code we can add breakpoint by typing "debugger;"
```
#### Using Chrome Debug tools
```nodemon --inspect-brk app.js```
Then go to ```chrome://inspect``` and open the "Open dedicated DevTools for Node"

### arraow functions and methods on objects (playground)

## Second - Consume api and serve content

### Web Server
    * http://expressjs.com/
    * web server from public folder. serving content of it.
    * middleware express: they are set using express method use() and are excecuted in sequenzial order unless one of then do not call next() callback.
    * view engien and more methods from express applications.
    * helpers hbs , partials and templates
    * Caching responses.
    * Consume api from node app using axios and https. (NASA)