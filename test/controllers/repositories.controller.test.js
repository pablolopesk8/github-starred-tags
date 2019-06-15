const should = require('should'); // eslint-disable-line
const sinon = require('sinon');
const repositoriesController = require('../../src/controllers/repositories.controller');

// variable to be used in tests
const invalidGithubUser = "invalidUser123456";
const validGithubUser = "brainnco";
const existingUser = "pablolopesk8";
const nonexistingUser = "44past4";
const nonexistingRepo = "123456";

describe('Controller Repositories Test', () => {
    describe('Starred - Get', () => {
        it('Should have an user in the url parameter', async () => {
            const req = { params: {} };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.getStarredRepositories(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('A valid user from Github is required in url').should.equal(true);
        });
        
        it('Should have an user string in the url parameter', async () => {
            const req = { user: 123, params: {} };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.getStarredRepositories(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('A valid user from Github is required in url').should.equal(true);
        });

        it('Should have a valid github user string in the url parameter', async () => {
            const req = { user: invalidGithubUser, params: {} };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.getStarredRepositories(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('A valid user from Github is required in url').should.equal(true);
        });
    });

    describe('Tags - Update', () => {
        it('Should have an user in url parameter', async () => {
            const req = { params: {} };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.updateTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('A valid user from Github is required in url').should.equal(true);
        });

        it('Should have an user string in url parameter', async () => {
            const req = { user: 123, params: {} };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.updateTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('A valid user from Github is required in url').should.equal(true);
        });
        
        it('Should have an existing user in the url parameter', async () => {
            const req = { user: nonexistingUser, params: { repoId: nonexistingRepo } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.updateTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('An existing user is required in url').should.equal(true);
        });

        it('Should have an repoId in url parameter', async () => {
            const req = { user: validGithubUser, params: {} };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.updateTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('A valid repoId from Github is required in url').should.equal(true);
        });

        it('Should have an existing repoId in url parameter', async () => {
            const req = { user: existingUser, params: { repoId: nonexistingRepo } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.updateTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('An existing repoId is required in url').should.equal(true);
        });

        it('Should have an array of tags in body', async () => {
            const req = { user: existingUser, params: { repoId: nonexistingRepo }, body: {} };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.updateTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('An array of tag strings is required').should.equal(true);
        });

        it('Should have an array of tags, not empty, in body', async () => {
            const req = { user: existingUser, params: { repoId: nonexistingRepo }, body: { tags: [] } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.updateTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('An array of tag strings is required').should.equal(true);
        });

        it('Should have an array of tags, in string format, in body', async () => {
            const req = { user: existingUser, params: { repoId: nonexistingRepo }, body: { tags: [ 'tag111', 123] } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.updateTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('An array of tag strings is required').should.equal(true);
        });
    });
});
