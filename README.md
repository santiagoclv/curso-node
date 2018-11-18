# CursoNode

## First - Simple r and w over the fs using node and a overview over debugging an app

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

### arraow functions and methods on objects

## Second - Async Basics

## Web Server And Deployment
    * http://expressjs.com/
    * web server from public folder. serving content of it.
    * middleware express: they are set using express method use() and are excecuted in sequenzial order unless one of then do not call next() callback.
    * view engien and more methods from express applications.
    * helpers hbs , partials and templates
    * Deploy on firebase using Hosting (static folder), Functions (dynamic folder) and Database (Cloud Firestore)
    * Caching responses.
    
## Automated Test
    * Using mocha to run the tests.
    * Using expect to do assertions.
    * Async assertions.
    * Using supertest to do request to express server.