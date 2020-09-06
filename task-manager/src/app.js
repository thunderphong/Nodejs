const path = require('path');
require('dotenv').config({path: path.resolve(__dirname,'../config/.env')});
const express = require('express');
require('./db/mongoose');

const app = express();

app.use(express.json());

const userRouter = require('./routers/user');
app.use(userRouter);

const taskRouter = require('./routers/task');
app.use(taskRouter);

module.exports = app;