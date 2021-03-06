const express = require('express');
const User = require("../modules/user");
const auth = require("../middlewares/auth");
const imageAvatar = require("../middlewares/multer");
const convertAvatar = require("../utils/convertAvatar");

const router = new express.Router();

router.get("/users/me", auth, (req, res) => {
    res.send(req.user);
});

router.delete("/users/me", auth, async (req, res) => {
    try {
        await req.user.remove();
        res.status(200).send(req.user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", 'email', 'password', 'age'];
    const isValidUpdate = updates.every( up => allowedUpdates.includes(up) )

    if(!isValidUpdate){
        return res.status(400).send("Request includs a non valid field to update");
    }

    try {
        updates.forEach( field => req.user[field] = req.body[field]);
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/users/me/avatar", [auth, imageAvatar.single('avatar')], async (req, res) => {
    try {
        const image = await convertAvatar(req.file.buffer);
        req.user.avatar = {
            image,
            mimetype: 'image/png'
        }
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error.message);
    }
}, (error, req, res, next) => {
    // CATCH THEM ALL __ERRORS__
    res.status(400).send(error.message);
});


router.delete("/users/me/avatar", auth, async (req, res) => {
    try {
        req.user.avatar = undefined;
        await req.user.save();
        res.send(req.user.avatar);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/users/:id/avatar", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user || !user.avatar){
            throw new Error();
        }

        res.set('Content-Type', user.avatar.mimetype);
        res.send(user.avatar.image);
    } catch (error) {
        res.status(404).send();
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
        res.status(401).send(error);
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