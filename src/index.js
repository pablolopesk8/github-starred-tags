'use strict';

// Express init
const express = require('express');
const server = express();

// Body parser config
const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Get env variables
require('dotenv').config({ path: __dirname + '/env/.env' });
const portApi = process.env.PORT_API || 3000;
const env = process.env.ENV || 'dev'; // eslint-disable-line

// Get database and connect
const { DBConnect } = require('./db.service');

DBConnect().then(
	() => {
		/*** the server is only started if connected successfully on database ***/
		
		// listener to get requests for /
		server.get('/', (req, res) => {
			res.send('Github API is working!!!');
		});

		// start server on the port defined by env
		server.app = server.listen(portApi, () => {
			console.log(`Server listening on port ${portApi}`);
		});
	},
	(err) => {
		console.log(err);
	}
);

module.exports = server;