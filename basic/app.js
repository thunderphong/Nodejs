// Require dotenv
require('dotenv').config();

// Require Express
const express = require('express');
const app = express();

app.listen(process.env.PORT || 3000, () => console.log('Express listen on port ' + process.env.PORT || 3000));

// Set mongoose and database
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECT, 
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    (err) => {
        if(err) console.log(err);
        else console.log('Connected to db');
    }
);

// Set req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set express-validator
const validator = require('express-validator');
app.use(validator());

// Routes
const gelRoute = require('./routes/gel.routes');
app.use('/', gelRoute);