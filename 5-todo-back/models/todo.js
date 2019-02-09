

const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3, trim: true },
    text: { type: String, required: true, minlength: 3, trim: true },
    completed: { type: Boolean },
    createdAt: { type: Date, default: Date.now },
    finishedAt: { type: Date },
});

TodoSchema.methods.markAsCompleted = function () {
    this.completed = true;
    this.finishedAt = Date.now();
    this.save();
};
  
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {Todo, mongoose};