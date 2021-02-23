const { model, Schema } = require('mongoose');
const { isEmail } = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const tokenSchema = new Schema({ 
    token: {
        type: String,
        required: true,
    }
});
const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if(value.toLowerCase().includes("password")){
                throw new Error("password can not include word password")
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!isEmail(value)){
                throw new Error("email must be a valid email address")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            // o podemos usar valudator package
            if(value < 0){
                throw new Error("age must be a positive number")
            }
        }
    },
    tokens: [tokenSchema]
});

userSchema.methods.generateAuthToken = async function generateAuthToken(){
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async function (email, password) {
    const user = await User.findOne({ email });

    if(!user){
        throw new Error('unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('unable to login');
    }

    return user;
}

async function hashPassword(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
}

userSchema.pre('save', hashPassword);

const User = model('User', userSchema);

module.exports = User;