
const jwt = require('jsonwebtoken');
const User = require('../modules/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const cosas = jwt.verify(token, process.env.KEY);
        const user = await User.findOne({ _id: cosas._id, 'tokens.token': token });

        if(!user){
            throw new Error();
        }
        
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.'})
    }
}

module.exports = auth;