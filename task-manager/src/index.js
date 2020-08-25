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

// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async () => {
//     const user = await User.findById('5f3b7f79700a1234d0a7a4d9');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
// }

// main();