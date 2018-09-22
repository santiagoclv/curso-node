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