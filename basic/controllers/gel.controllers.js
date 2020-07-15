const gelSchema = require('../models/gel.models');

exports.gel = (req, res) => {
    const post = gelSchema.find()
        .select("title")
        .then(result => res.json({result}))
        .catch(err => console.err(err));
}

exports.createGel = (req, res) => {
    const gel = new gelSchema(req.body);
    gel.save()
        .then(result =>  res.status(200).json({ post: result }))
        .catch(err => console.log(err));
}