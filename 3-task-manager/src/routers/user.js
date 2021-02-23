const express = require('express');
const User = require("../modules/user");
const router = new express.Router();

router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.send(users)
    } catch (error) {
        res.status(500).send(error.errors);
    }
});

router.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(user ? 200 : 404 ).send(user)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message);
    }
});

router.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(user ? 200 : 404 ).send(user)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message);
    }
});

router.patch("/users/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const updates = Object.keys(data);
    const allowedUpdates = ["name", 'email', 'password', 'age'];
    const isValidUpdate = updates.every( up => allowedUpdates.includes(up) )

    if(!isValidUpdate){
        return res.status(400).send("Request includs a non valid field to update");
    }

    try {
        const user = await User.findById(id);
        updates.forEach( field => user[field] = data[field]);
        await user.save();
        res.status(user ? 200 : 404 ).send(user);
    } catch (error) {
        console.error(error)
        res.status(400).send(error.message);
    }
});

router.post("/users", async (req, res) => {
    const user = new User(req.body);
    
    try {
        const newUser = await user.save();
        res.status(201).send(newUser)
    } catch (error) {
        res.status(400).send(error.errors);
    }
});

router.post("/users/login", async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const user = await User.findByCredentials(email, password);
        res.send(user);
    } catch (error) {
        res.status(400).send();
    }
});


module.exports = router;