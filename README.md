# brainnco-challenge

This repository was create for Challenge for hiring process in Brainnco.

## Overview

This API was created to build funcionalities that doesn't exists in Github, like set tags for your starred repositories, to turn easier your search into your repositories.  
DOESN'T HAVE an frontend interface in this repository. But, you can use this API service to create your own frontend interface, consuming this service and showing informations for your users.  

## Github Integration

To integrate with Github, was used the **OAuth2** as an auth method, because OAuth2 improves the limits of API and for security reasons noticed by Github.  
For this reason, you need to create a token in your Github account, how is explained in this [article](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line) and to set in the [configuration file](#enviroment-variable). Obs: doesn't forget to enable the **user** permission for the generated token.

## Language and Libraries

[NodeJS](http://nodejs.org), in the LTS version, was chosen as language to develop this API. Many available features on last versions of ECMA Script were used during development. But, some features, like 'import', are available on the last LTS Node version (10.15.3) as experimental, therefore, these features didn't use on this code.  
But, this language doesn't work alone, so, some libraries was used between NodeJS:

1. [Express](https://expressjs.com/pt-br/) - used to manage and to configure the routes of API
2. [BodyParser](https://www.npmjs.com/package/body-parser) - used because of the necessity to parsing the requests
3. [Request Pomisse Native](https://github.com/request/request-promise-native) - used to enable the use of promisses natively, with async / await
4. [Dotenv](https://www.npmjs.com/package/dotenv) - used to set enviroment variables

### Linter

Linter is a good way to keep the code consistent, clean and following the definitions of the project. For this project, was chosen [ESLint](https://eslint.org/) with the basic NodeJS configuration. The linter is configurated only in *development* enviroment.

#### Development enviroment

In development mode, the [Nodemon](https://nodemon.io/) was used to watch files and restart files in every change.

## Database

[MongoDB](https://www.mongodb.com/) was used as storage. The reasons for this choice are, mainly, the speed and the simplicity of the data. The data stored are only user and his repositories. So, it's easier to store them in a NoSQL and document drive storage.  
For connect and execute operations in database, was used [Mongoose](https://mongoosejs.com/).  
MongoDB was configured with auth to provide more security.

## Microservices

Using the approach of Microservices, [Docker](https://docker.com) was used to create to services for this application:

1. NodeJS Server: a simple server, with the minimum configuration, running node and exposing the port 3001
2. MongoDB Server: a server with minimum configuration, running MondoDB and exposing the port 3002

> To connect a container from another, you need to use the name of service and the intern port of this service

## Endpoints

In the API there are 3 endpoints:

1. GET a list of user repositories starred
2. POST tags into an user repository
3. DELETE tags from an user repository

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

> If you run only NodeJS service, you need start manually the container of database. And your connection with mongo must be done using *localhost:exposed_port*.

## Tests

For the tests was used [Mocha](https://mochajs.org/) as library to execute and to describe the tests. For the assertion and validation was used [ShouldJS](https://shouldjs.github.io/). And for faker returns and throws of server, was used [Sinon](https://sinonjs.org/).  
To run the tests, watching files and re-run in each file modification, use

```bash
npm test:watch
```

And to run the tests withou watch, use

```bash
npm test
```
