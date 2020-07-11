const gelSchema = require('../models/gel.models');
const { get } = require('mongoose');

exports.gel = (req, res) => res.json({
    message: "Return something"
});

exports.createGel = (req, res) => {
    const gel = new gelSchema(req.body);
    gel.save()
        .then(result =>  res.status(200).json({ post: result }))
        .catch(err => console.log(err));
}