module.exports = (error, req, res, next) => {
    if(error){
        console.log(JSON.stringify(error, null, 2));
        res.status(500).send(error.message);
    }
    next();
}