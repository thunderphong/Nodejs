// Require dotenv
require('dotenv').config();

// Require Express
const express = require('express');
const app = express();

app.listen(process.env.PORT || 3000, () => console.log('Express listen on port ' + process.env.PORT || 3000));

// Routes
