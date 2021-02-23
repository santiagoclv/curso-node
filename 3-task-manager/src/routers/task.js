const express = require('express');

const Task = require("../modules/task");
const router = new express.Router();

router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error.errors);
    }
});

router.get("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        res.status(task ? 200 : 404 ).send(task)
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.status(task ? 200 : 404 ).send(task)
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.patch("/tasks/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const updates = Object.keys(data);
    const allowedUpdates = ["description", 'completed'];
    const isValidUpdate = updates.every( up => allowedUpdates.includes(up) )

    if(!isValidUpdate){
        return res.status(400).send("Request includs a non valid field to update");
    }

    try {
        const task = await Task.findById(id);
        updates.forEach( field => task[field] = data[field]);
        await task.save();
        res.status(task ? 200 : 404 ).send(task);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/tasks", async (req, res) => {
    const task = new Task(req.body);
    
    try {
        const newTask = await task.save();
        res.status(201).send(newTask)
    } catch (error) {
        res.status(400).send(error.errors);
    }
});

module.exports = router;