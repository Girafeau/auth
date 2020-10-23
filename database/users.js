const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.model('users', new Schema({
    email: { type: String, default: '' },
    firstname: { type: String },
    lastname: { type: String },
    password: { type: String },
    username: { type: String }
}));

const users = mongoose.model('users');

module.exports.get = function(id) {
    return users.findOne({_id: id});
};

module.exports.getByEmail = function(email) {
    return users.findOne({email: email});
};

module.exports.save = function(user) {
    const entry = new users({
        email: user.email,
        password: user.password
    });

    return entry.save();
}