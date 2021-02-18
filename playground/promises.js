const sleep = async (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    })
}

const sayHi = async () => {
    await sleep(2500);
    return "Hi";
}

sayHi().then( message => {
    console.log(message);
})