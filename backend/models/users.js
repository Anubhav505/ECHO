const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    username: {
        type: String,
        required: true,   // Ensure username is required
        unique: true      // Ensure username is unique
    },
    email: {
        type: String,
        required: true,
        unique: true      // Ensure email is unique
    }
});

// Add passport-local-mongoose methods to handle username and password
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
