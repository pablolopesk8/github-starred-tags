const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Users model, created as a mongoose Schema
 * 
 * @todo validation for string type doesn't work
 *      It's needed a custom validator, that won't be created at this moment
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
                type:[{
                    githubId: {
                        type: Number,
                        required: [true, 'githubId is required']
                    },
                    name: {
                        type: String,
                        required: [true, 'name is required']
                    },
                    url: {
                        type: String,
                        required: [true, 'url is required']
                    },
                    fullName: String,
                    description: String,
                    language: String,
                    tags: [ String ]
                }]
            }
        })
    }
});

module.exports = mongoose.model('Users', usersModel);