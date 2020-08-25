const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)) throw new Error('Email is invalid!');
        }
            
    },
    age: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if (validator.contains(value.toLowerCase(), 'password')) throw new Error('Password must not have string \'password\' inside!')
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, 'mockData'
        // , { expiresIn: '1m' }
    );
    user.tokens = user.tokens.concat({ token })
    await user.save();
    return token;
}

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

// Login 
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Unable to login');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Unable to login');

    return user;
}

// Hash password before saving
userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) 
        user.password = await bcrypt.hash(user.password, 8);

    next();
})

userSchema.pre('remove', async function(next) {
    const user = this;
    await Task.deleteMany({owner: user._id});
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;