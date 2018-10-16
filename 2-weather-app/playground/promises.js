const somePromise = new Promise( (resolve, reject) => {
    setTimeout( () => {
        resolve("Hi");
    }, 2500);
});

somePromise.then( message => {
    console.log("Success: ", message);
})
.then( message => {
    console.log("Success: ", message);
})
// catch cleans the error fom the chain of promises and try to handle them
.catch( errorMessage => {
    console.log("Error: ", errorMessage);
})
.then( message => {
    console.log("Success: ", message);
});