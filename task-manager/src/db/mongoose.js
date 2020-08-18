const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test',
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true },
    (err) => {
        if(err) console.log(err);
        else console.log('Connected to db');
    }
)