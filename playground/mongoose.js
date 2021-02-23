require("dotenv/config");
const { connect, model, Schema } = require('mongoose');
const { isEmail } = require("validator");

const connectionURL = process.env.MONGODB_URL;

connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = model('User', {
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
    }
});


const TaskSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

const Task = model('Task', TaskSchema);

const user = new User({name: "Robertito", age: 3, email: "robertitom@gmail.com"});
user.save();

