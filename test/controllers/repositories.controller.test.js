const should = require('should'); // eslint-disable-line
const sinon = require('sinon');
const repositoriesController = require('../../src/controllers/repositories.controller');

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
            const req = { params: { user: 123 } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.getStarredRepositories(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('A valid user from Github is required in url').should.equal(true);
        });

        it('Should have a valid github user string in the url parameter', async () => {
            const req = { params: { user: "invalidUser123456" } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.getStarredRepositories(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('A valid user from Github is required in url').should.equal(true);
        });

        it('If have tags in the url parameter, should have valid strings', async () => {
            const req = { params: { user: "pablolopesk8", tags: [123] } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.getStarredRepositories(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('If you passed tags in url, they need to be valid strings').should.equal(true);
        });
    });

    describe('Tags - Insert', () => {
        it('Should have an user in url parameter', async () => {
            const req = { params: {} };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.insertTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('A valid user from Github is required in url').should.equal(true);
        });

        it('Should have an user string in url parameter', async () => {
            const req = { params: { user: 123 } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.insertTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('A valid user from Github is required in url').should.equal(true);
        });
        
        it('Should have an existing user in the url parameter', async () => {
            const req = { params: { user: "invalidGithubUser123456", repoId: 123 } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.insertTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('An existing user is required in url').should.equal(true);
        });

        it('Should have an repoId in url parameter', async () => {
            const req = { params: { user: 'pablolopesk8' } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.insertTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('A valid repoId from Github is required in url').should.equal(true);
        });

        it('Should have a valid repoId number in url parameter', async () => {
            const req = { params: { user: "pablolopesk8", repoId: '123' } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.insertTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('A valid repoId from Github is required in url').should.equal(true);
        });

        it('Should have an existing repoId in url parameter', async () => {
            false.should.be.true();
        });

        it('Should have an array of tags in body', async () => {
            const req = { body: {} };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.insertTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('An array of tag strings is required').should.equal(true);
        });

        it('Should have an array of tags, not empty, in body', async () => {
            const req = { body: { tags: [] } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.insertTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('An array of tag strings is required').should.equal(true);
        });

        it('Should have an array of tags, in string format, in body', async () => {
            const req = { body: { tags: [ 'tag111', 123] } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.insertTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('An array of tag strings is required').should.equal(true);
        });
    });

    describe('Tags - Delete', () => {
        it('Should have an user in url parameter', async () => {
            const req = { params: {} };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.deleteTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('A valid user from Github is required in url').should.equal(true);
        });

        it('Should have an user string in url parameter', async () => {
            const req = { params: { user: 123 } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.deleteTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('A valid user from Github is required in url').should.equal(true);
        });
        
        it('Should have a valid github user string in the url parameter', async () => {
            const req = { params: { user: "invalidGithubUser123456" } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.deleteTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('A valid user from Github is required in url').should.equal(true);
        });

        it('Should have an existing user in the url parameter', async () => {
            const req = { params: { user: "invalidGithubUser123456", repoId: 123 } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.insertTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('An existing user is required in url').should.equal(true);
        });

        it('Should have an repoId in url parameter', async () => {
            const req = { params: { user: "pablolopesk8" } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.deleteTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('A valid repoId from Github is required in url').should.equal(true);
        });

        it('Should have a valid repoId number in url parameter', async () => {
            const req = { params: { user: 'pablolopesk8', repoId: '123' } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.deleteTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('A valid repoId from Github is required in url').should.equal(true);
        });

        it('Should have an existing repoId in url parameter', async () => {
            false.should.be.true();
        });

        it('Should have an array of tags in body', async () => {
            const req = { body: {} };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.deleteTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('An array of tag strings is required').should.equal(true);
        });

        it('Should have an array of tags, not empty, in body', async () => {
            const req = { body: { tags: [] } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.deleteTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('An array of tag strings is required').should.equal(true);
        });

        it('Should have an array of tags, in string format, in body', async () => {
            const req = { body: { tags: [ 'tag111', 123] } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.deleteTags(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('An array of tag strings is required').should.equal(true);
        });
    });
});
