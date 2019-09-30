const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password:  String,
    repeatPassword: String,
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

module.exports.ModelUser = mongoose.model('Users', userSchema);
