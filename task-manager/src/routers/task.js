const express = require('express');
const Task = require('../models/task')
const router = new express.Router();

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/tasks', async (req, res) =>{
    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if (!task) return res.status(404).send();
        res.send(task);
    } catch (err) {
        res.status(500).send(err)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const update = Object.keys(req.body);
    const allowUpdate = ['description', 'completed'];
    const isValidOperate = update.every((key) => allowUpdate.includes(key));

    if(!isValidOperate) return res.status(400).send({err: 'Invalid Update'});

    try {
        const task = await Task.findById(req.params.id);
        update.forEach((up) => task[up] = req.params[up]);
        await task.save();

        if (!task) return res.status(404).send();
        res.send(task);
    } catch (err) {
        res.status(400).send(err);
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).send();
        res.send(task);
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;