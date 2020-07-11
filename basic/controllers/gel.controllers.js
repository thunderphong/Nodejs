const gelSchema = require('../models/gel.models');

exports.gel = (req, res) => res.json({
    message: "Return something"
});

exports.createGel = (req, res) => {
    const gel = new gelSchema(req.body);
    gel.save((err, product) => {
        if (err) return res.status(400).json({err});
        res.status(200).json({product});
    });
}