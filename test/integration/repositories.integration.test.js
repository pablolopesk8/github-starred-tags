/**
 * File to make tests about integration involving repositories
 * Using fake data, is possible verify if the call of the methods exposed by API get the correct result
 */
const should = require('should'); // eslint-disable-line
const server = require('../../src/index');
const request = require('supertest');
const agent = request.agent(server);

// variable to be used in tests
const githubUserWithStarred = "pablolopesk8";
const githubUserWithoutStarred = "brainnco";
const existingRepoId = 35914020;

describe('Integration Repositories Test', () => {
    describe('Starred - Get', () => {
        it('Should be able to return an array of repositories, passing an user as url parameter', async () => {
            await agent.get(`/${githubUserWithStarred}/repos/starred`)
                .expect(200)
                .expect('Content-Type', /json/)
                .then((results) => {
                    results.body.should.have.property('repositories');
                    results.body.repositories.should.be.array();
                });
        });

        it('Should be able to return an empty array of repositories, passing an user as url parameter', async () => {
            await agent.get(`/${githubUserWithoutStarred}/repos/starred`)
                .expect(200)
                .expect('Content-Type', /json/)
                .then((results) => {
                    results.body.should.have.property('repositories');
                    results.body.repositories.should.be.equal([]);
                });
        });

        it('Should be able to return an array of repositories, passing an user as url parameter and an array of tags', async () => {
            await agent.get(`/${githubUserWithStarred}/repos/starred?tag1,tag2,tag3`)
                .expect(200)
                .expect('Content-Type', /json/)
                .then((results) => {
                    results.body.should.have.property('repositories');
                    results.body.repositories.should.be.array();
                });
        });
    });

    describe('Tags - Update', () => {
        it('Should be able to update the tags and get the result, passing an user and repo on the url, and an array of tags on the body', async () => {
            const tags = ['tag1', 'tag2'];
            await agent.patch(`/${githubUserWithStarred}/${existingRepoId}/tags`)
                .send({tags: tags})
                .expect(200)
                .expect('Content-Type', /json/)
                .then((results) => {
                    results.body.should.have.property('tags');
                    results.body.tags.should.be.equal(tags);
                });
        });

        it('Should be able to get an empty result, passing an user and repo on the url, and an empty array of tags on the body', async () => {
            const tags = [];
            await agent.patch(`/${githubUserWithStarred}/${existingRepoId}/tags`)
                .send({tags: tags})
                .expect(200)
                .expect('Content-Type', /json/)
                .then((results) => {
                    results.body.should.have.property('tags');
                    results.body.tags.should.be.equal(tags);
                });
        });
    });
});