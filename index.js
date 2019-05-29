'use strict';

// Express init
const express = require('express');
const server = express();
// Body parser config
const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
// Get env variables
const portApi = process.env.PORT_API || 3000;
const env = process.env.ENV || 'dev';
const mongoUser = process.env.MONGODB_USER || 'admin';
const mongoPass = process.env.MONGODB_PASS || '';
const mongoHost = process.env.MONGODB_HOST || 'localhost';
const mongoPort = process.env.MONGODB_PORT || '27017';
const mongoDatabase = process.env.MONGODB_DATABASE || 'test';
// Get mongoose and connect
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${mongoDatabase}`, {useNewUrlParser: true});

// listener to get requests for /
server.get('/', (req, res) => {
	res.send('Github API is working!!!');
});

// start server on the port defined by env
server.app = server.listen(portApi, () => {
	console.log(`Server listening on port ${portApi}`);
});

module.exports = server;
