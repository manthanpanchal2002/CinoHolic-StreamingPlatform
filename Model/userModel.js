const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide your first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please provide your last name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false,
    },
});

// Password Encryption
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    else {
        this.password = await bcrypt.hash(this.password, 15);
    }
});

// Compares the password entered by the user with the password stored in the database
userSchema.methods.comparePassword = async function (pswd, pswdDB) {
    return await bcrypt.compare(pswd, pswdDB);
}

const User = mongoose.model('User', userSchema);
module.exports = User;