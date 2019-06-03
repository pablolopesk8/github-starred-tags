const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Users model, created as a mongoose Schema
 */
const usersModel = new Schema({
    githubUser: {
        type: String,
        required: [true, 'githubUser is required'],
        unique: true
    },
    repositories: {
        type: new Schema({
            starred: {
                type:[new Schema({
                    githubId: {
                        type: String,
                        required: [true, 'githubId is required']
                    },
                    name: {
                        type: String,
                        required: [true, 'name is required']
                    },
                    url: {
                        type: String,
                        required: [true, 'url is required']
                    }
                })]
            }
        })
    }
});

module.exports = mongoose.model('Users', usersModel);