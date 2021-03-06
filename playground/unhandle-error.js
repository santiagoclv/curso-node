// Catching uncaught exceptions
// If an uncaught exception gets thrown during the execution of your program, your program will crash.

// To solve this, you listen for the uncaughtException event on the process object:

process.on('uncaughtException', err => {
    console.log(JSON.stringify(err, null, 2))
    process.exit(1) //mandatory (as per the Node.js docs)
})