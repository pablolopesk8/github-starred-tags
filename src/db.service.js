/**
 * Service to provide a method to connect into database
 */
// Get env variables
const mongoUser = process.env.MONGODB_USER || 'admin';
const mongoPass = process.env.MONGODB_PASS || '';
const mongoHost = process.env.MONGODB_HOST || 'localhost';
const mongoPort = process.env.MONGODB_PORT || '27017';
const mongoDatabase = process.env.MONGODB_DATABASE || 'test';
// Get mongoose
const mongoose = require('mongoose');

// method to connect in a database, using parameters in .env file
const DBConnect = async () => {
    return await mongoose.connect(`mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`, {
        auth: { user: mongoUser, password: mongoPass },
        useNewUrlParser: true
    });
};

module.exports = { DBConnect: DBConnect };