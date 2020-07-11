const mongoose = require('mongoose');

const gelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required",
        min: 6,
        max: 100
    },
    body: {
        type: String,
        required: "Body is required",
        min: 6,
        max: 1000
    }
});

module.exports = mongoose.model('gel', gelSchema);