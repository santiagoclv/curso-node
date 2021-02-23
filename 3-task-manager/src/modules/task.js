const { model, Schema } = require('mongoose');

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

module.exports = Task;