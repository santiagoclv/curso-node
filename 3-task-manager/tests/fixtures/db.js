const { Types: { ObjectId } } = require('mongoose');
const User = require("../../src/modules/user");
const Task = require("../../src/modules/task");

const user_one_id = new ObjectId();
const user_two_id = new ObjectId();

const user_one = {
    _id: user_one_id,
    name: "Martin",
    age: 4,
    email: "martin@gm.com",
    password: "martin123"
};

const user_two = {
    _id: user_two_id,
    name: "Santiago",
    age: 3,
    email: "santi@gm.com",
    password: "santi123",
};


const task_user_one = [
    {
        _id: new ObjectId(),
        description: "Test desc 1",
        completed: false,
        owner: user_one_id
    },
    {
        _id: new ObjectId(),
        description: "Test desc 2",
        completed: true,
        owner: user_one_id
    }
];


const task_user_two = [
    {
        description: "Test desc 3",
        completed: false,
        owner: user_two_id
    },
    {
        description: "Test desc 4",
        completed: false,
        owner: user_two_id
    },
    {
        description: "Test desc 5",
        completed: true,
        owner: user_two_id
    }
]

const setupDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(user_two).save();
    await Task.insertMany(task_user_one);
    await Task.insertMany(task_user_two);
}


module.exports = {
    user_one,
    user_two,
    task_user_one,
    task_user_two,
    setupDatabase,
}