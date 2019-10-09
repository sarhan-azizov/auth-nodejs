const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password:  String,
    repeatPassword: String,
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

module.exports.Users = mongoose.model('Users', UsersSchema, 'Users');
