const db = require('./db');

module.exports.singUp = (email, pass) => {
        db.saveUser(email, pass);
}