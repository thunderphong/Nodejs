const express = require('express');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const userRouter = require('./routers/user');
app.use(userRouter);

const taskRouter = require('./routers/task');
app.use(taskRouter);

app.listen(port, () =>{
    console.log('Server\'s up on port', port);
})

// const jwt = require('jsonwebtoken');

// const myFunct = async () => {
//     const token = jwt.sign({ _id: 'abcs' }, 'nsdas', {expiresIn: '7 days'});
//     console.log(token);

//     const data = jwt.verify(token, 'nsdas');
//     console.log(data);
// }

// myFunct()