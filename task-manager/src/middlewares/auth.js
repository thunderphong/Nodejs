const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decode = jwt.verify(token, 'mockData');
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token });

        if (!user) throw new Error();

        req.token = token;
        req.user = user; // Assign user, mongooseDB instance to a req.user => if req.user save, it save.
        next();
    } catch (err) {
        res.status(401).send({err: 'Please authenticate!'});
    }
}

module.exports = auth;