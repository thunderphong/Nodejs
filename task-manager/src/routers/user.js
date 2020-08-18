const express = require('express');
const User = require('../models/user')
const router = new express.Router();
const auth = require('../middlewares/auth');

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token })
    } catch (err) { res.status(400).send(err) }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ token, user });
    } catch (err) { res.status(400).send(err) }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save(); // method trong express
        res.send();
    } catch (err) { res.status(500).send('Authenticated please!') }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (err) { res.status(500).send('Authenticated please!') }
})

router.get('/users/me', auth, async (req, res) =>{
    res.send(req.user);
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