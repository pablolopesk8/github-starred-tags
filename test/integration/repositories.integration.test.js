/**
 * File to make tests about integration involving repositories
 * Using fake data, is possible verify if the call of the methods exposed by API get the correct result
 */
const should = require('should'); // eslint-disable-line
const server = require('../../src/index');
const request = require('supertest');
const agent = request.agent(server);
//const { DBCloseConnection } = require('../../src/services/db.service');
//const Users = require('../../src/models/users.model');

describe('Integration Repositories Test', () => {
    describe('Starred - Get', () => {
        it('Should be able to return an array of repositories, passing a user as url parameter', async () => {
            await agent.get('/pablolopesk8/repos/starred')
                .expect(200)
                .expect('Content-Type', /json/)
                .then((results) => {
                    results.body.should.have.property('repositories');
                    results.body.repositories.should.be.array();
                });
        });

        it('Should be able to return an array of repositories, passing a user as url parameter and an array of tags', async () => {
            await agent.get('/pablolopesk8/repos/starred?tag1,tag2,tag3')
                .expect(200)
                .expect('Content-Type', /json/)
                .then((results) => {
                    results.body.should.have.property('repositories');
                    results.body.repositories.should.be.array();
                });
        });
    });
});