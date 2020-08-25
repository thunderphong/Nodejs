const express = require('express');
const Task = require('../models/task')
const router = new express.Router();
const auth = require('../middlewares/auth');

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save();
        res.status(201).send(task)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/tasks', auth, async (req, res) => {
    try {
        await req.user.populate('tasks').execPopulate();
        res.send(req.user.tasks);
    } catch (err) { res.status(500).send(err) }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({ _id, owner: req.user._id });
        if (!task) return res.status(404).send();
        res.send(task);
    } catch (err) {
        res.status(500).send(err)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const update = Object.keys(req.body);
    const allowUpdate = ['description', 'completed'];
    const isValidOperate = update.every((key) => allowUpdate.includes(key));

    if(!isValidOperate) return res.status(400).send({err: 'Invalid Update'});

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});
        if (!task) return res.status(404).send();
        update.forEach((up) => task[up] = req.body[up]);
        await task.save();
        res.send(task);
    } catch (err) {
        res.status(400).send(err);
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        if (!task) return res.status(404).send();
        res.send(task);
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;