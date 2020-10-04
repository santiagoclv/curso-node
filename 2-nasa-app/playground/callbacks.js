const getUser = (id, callback) => {
    const user = {
        id,
        nombre: "Santiago"
    };
    setTimeout(()=> callback(user), 3000);
};


getUser(31, console.log);
