const express = require('express');
const auth = require("../middlewares/auth");
const Task = require("../modules/task");
const router = new express.Router();

// PAgination is not complete without the total.
router.get("/tasks", auth, async (req, res) => {
    const { completed, limit, skip, sortby } = req.query;
    const match = { owner: req.user._id };
    const options = { };

    if(completed){
        match.completed = completed === 'true';
    }

    if(skip){
        options.skip = parseInt(skip);
    }

    if(limit){
        options.limit = parseInt(limit);
    }

    if(sortby){
        const field = sortby.split(":");
        options.sort = { [field[0]]: field[1] === 'desc' ? -1 : 1 };
    }

    try {
        // Alternatives.
        // await req.user.populate({ path: 'tasks', match, options }).excecPopulate();
        const tasks = await Task.find(match, null, options).exec();
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/tasks/:id", auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findOne({ _id, owner: req.user._id });
        res.status(task ? 200 : 404 ).send(task)
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/tasks", auth, async (req, res) => {
    const task = new Task({...req.body, owner: req.user._id});
    
    try {
        const newTask = await task.save();
        res.status(201).send(newTask)
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/tasks/:id", auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
        res.status(task ? 200 : 404 ).send(task)
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.patch("/tasks/:id", auth, async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const updates = Object.keys(data);
    const allowedUpdates = ["description", 'completed'];
    const isValidUpdate = updates.every( up => allowedUpdates.includes(up) )
    
    if(!isValidUpdate){
        return res.status(400).send("Request includs a non valid field to update");
    }
    
    try {
        const task = await Task.findOne({ _id: id, owner: req.user._id });

        if(!task){
            throw new Error('Unathorizedamlkfdsldk');
        }

        updates.forEach( field => task[field] = data[field]);
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(401).send(error.message);
    }
});

module.exports = router;