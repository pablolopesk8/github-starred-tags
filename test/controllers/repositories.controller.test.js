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

        it('Should have a valid user string in the url parameter', async () => {
            const req = { params: { user: 123 } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.getStarredRepositories(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('A valid user from Github is required in url').should.equal(true);
        });

        it('If have tags in the url parameter, should have valid strings', async () => {
            const req = { params: { user: "anyValidString", tags: [123] } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            await controller.getStarredRepositories(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('If you passed tags in url, they need to be valid strings').should.equal(true);
        });
    });

    describe('Tags - Insert', () => {
        it('Should have an user in url parameter', () => {
            const req = { params: {} };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            controller.insertTags(req, res);

            res.status.calledWith(500).should.equal(true);
            res.send.calledWith('A valid user from Github is required in url').should.equal(true);
        });

        it('Should have an repoId in url parameter', () => {
            const req = { params: {} };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            controller.insertTags(req, res);

            res.status.calledWith(500).should.equal(true);
            res.send.calledWith('A valid repoId from Github is required in url').should.equal(true);
        });

        it('Should have an array of tags in body', () => {
            const req = { body: {} };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            controller.insertTags(req, res);

            res.status.calledWith(500).should.equal(true);
            res.send.calledWith('An array of tag strings is required').should.equal(true);
        });
    });

    describe('Tags - Delete', () => {
        it('Should have an user in url parameter', () => {
            const req = { params: {} };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            controller.deleteTags(req, res);

            res.status.calledWith(500).should.equal(true);
            res.send.calledWith('A valid user from Github is required in url').should.equal(true);
        });

        it('Should have an repoId in url parameter', () => {
            const req = { params: {} };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            controller.deleteTags(req, res);

            res.status.calledWith(500).should.equal(true);
            res.send.calledWith('A valid repoId from Github is required in url').should.equal(true);
        });

        it('Should have an array of tags in body', () => {
            const req = { body: {} };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            controller.deleteTags(req, res);

            res.status.calledWith(500).should.equal(true);
            res.send.calledWith('An array of tag strings is required').should.equal(true);
        });
    });
});