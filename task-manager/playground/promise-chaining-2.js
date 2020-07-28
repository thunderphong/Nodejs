const Task = require('../src/models/Task');
const { count } = require('../src/models/Task');

require('../src/db/mongoose');

const findAndDelete = async (id, boo) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: boo});
    return count;
}

findAndDelete('5f1e8367094b4304ecdeb329', false)
    .then((result) =>{ console.log(result) })
    .catch((err) => console.log(err));
