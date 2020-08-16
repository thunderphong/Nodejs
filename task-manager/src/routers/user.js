const express = require('express');
const User = require('../models/user')
const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save(); 
        res.status(201).send(user)
    } 
    catch (err) { res.status(400).send() }
})

router.get('/users', async (req, res) =>{
    try { 
        const users = await User.find({});
        res.status(200).send(users);
    }
    catch (err) { res.status(500).send() }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try { 
        const user = await User.findById(_id);
        if (!user) res.status(404).send();
        res.send(user);
    }
    catch (err) { res.status(500).send() }
})

router.patch('/users/:id', async (req, res) => {
    const update = Object.keys(req.body);
    const allowUpdate = ['name', 'email', 'password', 'age'];
    const isValidOperate = update.every((key) => allowUpdate.includes(key));

    if(!isValidOperate) return res.status(400).send({err: 'Invalid Update'});

    try {
        const user = await User.findById(req.params.id);
        update.forEach((up) => user[up] = req.body[up]);
        await user.save();

        if (!user) return res.status(404).send();
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send();
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;