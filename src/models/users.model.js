const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Users model, created as a mongoose Schema
 */
const usersModel = new Schema({
    githubUser: {
        type: String,
        required: [true, 'githubUser is required']
    }
});

module.exports = mongoose.model('Users', usersModel);