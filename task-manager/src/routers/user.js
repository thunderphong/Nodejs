const express = require('express');
const User = require('../models/user')
const router = new express.Router();
const auth = require('../middlewares/auth');
const multer = require('multer');
const sharp = require('sharp');

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

router.patch('/users/me', auth, async (req, res) => {
    
    const update = Object.keys(req.body);
    const allowUpdate = ['name', 'email', 'password', 'age'];
    const isValidOperate = update.every((key) => allowUpdate.includes(key));

    if(!isValidOperate) return res.status(400).send({err: 'Invalid Update'});

    try {
        update.forEach((up) => req.user[up] = req.body[up]);
        await req.user.save();

        res.send(req.user);
    } catch (err) {
        res.status(400).send(err);
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.params._id);
        // if (!user) return res.status(404).send();
        await req.user.remove();
        res.send(req.user);
    } catch (err) {
        res.status(500).send(err);
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/))
            return cb(new Error('Uploaded file must be an image!'));

        cb(undefined, true);
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();  
    res.send('tada');
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined; // Delete a field: just make it undefined!
    await req.user.save();
    res.send();
})

router.get('/users/:id/avatar',  async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) throw new Error('No avatar');

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);

    } catch (err) { res.status(404).send(); }
})

module.exports = router;