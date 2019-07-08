# github-starred-tags

## Overview

This API was created to build funcionalities that doesn't exists in Github, like set tags for your starred repositories, to turn easier your search into your repositories.  
DOESN'T HAVE an frontend interface in this repository. But, you can use this API service to create your own frontend interface, consuming this service and showing informations for your users.  

## Github Integration

To integrate with Github, was used the **OAuth2** as an auth method, using a **Token**.  
For this reason, you need to create a token in your Github account, how is explained in this [article](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line) and to set in the [env file](#enviroment-variables). Obs: doesn't forget to enable the **user** permission for the generated token.  
After you create a token as above, you need to create a **OAuth App** following this [link](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/). This action is needed to increase your API Limit, how is explained in this [link](https://developer.github.com/v3/#increasing-the-unauthenticated-rate-limit-for-oauth-applications).  
If you don't want to use the **OAuth App** by your own risk, you will need to remove the *?client_id=XXX&client_secret=XXX* in [githubservice](src/services/github.service.js).

## Language and Libraries

[NodeJS](http://nodejs.org), was chosen as language to develop this API.
Some libraries was used between NodeJS:

1. [Express](https://expressjs.com/pt-br/) - used to manage and to configure the routes of API
2. [BodyParser](https://www.npmjs.com/package/body-parser) - used because of the necessity to parsing the requests
3. [Request Pomisse Native](https://github.com/request/request-promise-native) - used to enable the use of promisses natively, with async / await
4. [Dotenv](https://www.npmjs.com/package/dotenv) - used to store enviroment variables

### Linter

Linter is a good way to keep the code consistent, clean and following the definitions of the project. For this project, was chosen [ESLint](https://eslint.org/) with the basic NodeJS configuration. The linter is configurated only in *development* enviroment.

### Enviroment Variables

To store common variables that will be use in some parts of code, was used [Dotenv](https://www.npmjs.com/package/dotenv).  
There are two *.env* files on repository. And you need to create a *.env* file and put your own values here. Remember, your *.env* file will not be commited to the repository.

### Validator

To get validation of data, was used [AJV](https://github.com/epoberezkin/ajv). In some blogs and posts, the tests using AJV is faster than Joi or Validator.JS . Because of this, that library was chosen.

## Database

[MongoDB](https://www.mongodb.com/) was used as storage. The reasons for this choice are, mainly, the speed and the simplicity of the data.  
For connect and execute operations in database, was used [Mongoose](https://mongoosejs.com/).  
MongoDB was configured with auth to provide more security.

## Server

In development mode, the [Nodemon](https://nodemon.io/) was used to watch files and restart files in every change.

## Microservices

Using the approach of Microservices, [Docker](https://docker.com) was used to create to services for this application:

1. NodeJS Server: a simple server, with the minimum configuration, running node and exposing the port 3001
2. MongoDB Server: a server with minimum configuration, running MondoDB and exposing the port 3002

## Endpoints

In the API there are 2 endpoints:

1. GET a list of user repositories starred, filtering by tags or not
2. UPDATE tags into an user repository

For more details about the API, read the [Documentation](docs/API.apib)

## Running

To running this project, the best way is up the docker, because it will up both NodeJS and MongoDB services. And both are integrated. For this, use

```bash
docker-compose up -d
```

But, if you want to run only the NodeJS service in development, you can run

```bash
npm run start:dev
```

And, if you want to run only the NodeJS service in production, you can run

```bash
npm start
```

> If you run only NodeJS service, you need start manually the container of database. And your connection with mongo, configured on [env file](#enviroment-variables), must be done using *localhost:exposed_port*.

## Tests

For the tests was used [Mocha](https://mochajs.org/) as library to execute and to describe the tests. For the assertion and validation was used [ShouldJS](https://shouldjs.github.io/). For faker returns and throws of server, was used [Sinon](https://sinonjs.org/). And for HTTP tests was used [Supertest](https://www.npmjs.com/package/supertest).  
To run the tests, watching files and re-run in each file modification, use

```bash
npm test:watch
```

And to run the tests without watching, use

```bash
npm test
```

> My suggestion is to run the tests outside a container. For this, you need to update the [env file](#enviroment-variables) changing the *MONGODB_HOST* and *MONGODB_PORT* to your localhost configuration, like *localhost* and *3002*

## API Tests

To test de API Endpoints, you can use a Postman Collection. Click on this button and create a copy:  
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f4b814ebd8088b2b867e)

## IDE

The [VSCode](https://code.visualstudio.com/) was chosen as the IDE to develop this API. Was created config about that IDE and the file is [docs/vscode.config.json] with configurations about Debug using mocha, that can be used for anybody.

## IMPROVEMENTS

### model/users.model

Implements custom validators to string attributes

### tests/model/users.model.test

Implements validations to verify if model validated correctly strings attributes
