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
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
},
{
    timestamps: true
});

const Task = model('Task', TaskSchema);

module.exports = Task;