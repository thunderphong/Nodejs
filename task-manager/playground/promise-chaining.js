const User = require('../src/models/user');

require('../src/db/mongoose');

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age: age});
    const userCount = await User.countDocuments({age: age});
    return userCount;
}

updateAgeAndCount('5f1e852bc2010f2758966bf4', 2)
    .then((result) => console.log(result))
    .catch((err) => console.log(err))