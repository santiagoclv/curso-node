

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, trim: true },
    email: { type: String, required: true },
    age: { type: String },
    pass: { type: String },
});
  
const User = mongoose.model('User', UserSchema);

module.exports = {User};