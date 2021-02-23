const express = require('express');
const User = require("../modules/user");
const auth = require("../middlewares/auth");
const router = new express.Router();

router.get("/users/me", auth, (req, res) => {
    res.send(req.user);
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
        res.status(400).send(error);
    }
});

router.post("/users/login", async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.send({token});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter( ({token}) => token !== req.token);
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/users/logoutall", auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;