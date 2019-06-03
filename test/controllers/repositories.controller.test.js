const should = require('should'); // eslint-disable-line
const sinon = require('sinon');
const repositoriesController = {};

describe('Controller Repositories Test', () => {
    describe('Starred - Get', () => {
        it('Should have an user in the url parameter', () => {
            const req = { params: { } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            controller.getStarredRepositores(req, res);

            res.status.calledWith(500).should.equal(true);
            res.send.calledWith('user is required in url').should.equal(true);
        });
    });

    describe('Tags - Insert', () => {
        it('Should have an user in url parameter', () => {
            const req = { params: { } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            controller.insertTags(req, res);

            res.status.calledWith(500).should.equal(true);
            res.send.calledWith('user is required in url').should.equal(true);
        });

        it('Should have an repoId in url parameter', () => {
            const req = { params: { } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            controller.insertTags(req, res);

            res.status.calledWith(500).should.equal(true);
            res.send.calledWith('repoId is required in url').should.equal(true);
        });

        it('Should have an array of tags in body', () => {
            const req = { body: { } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            controller.insertTags(req, res);

            res.status.calledWith(500).should.equal(true);
            res.send.calledWith('tags is required, in array format').should.equal(true);
        });
    });

    describe('Tags - Delete', () => {
        it('Should have an user in url parameter', () => {
            const req = { params: { } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            controller.deleteTags(req, res);

            res.status.calledWith(500).should.equal(true);
            res.send.calledWith('user is required in url').should.equal(true);
        });

        it('Should have an repoId in url parameter', () => {
            const req = { params: { } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            controller.deleteTags(req, res);

            res.status.calledWith(500).should.equal(true);
            res.send.calledWith('repoId is required in url').should.equal(true);
        });

        it('Should have an array of tags in body', () => {
            const req = { body: { } };

            const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

            const controller = repositoriesController;
            controller.deleteTags(req, res);

            res.status.calledWith(500).should.equal(true);
            res.send.calledWith('tags is required, in array format').should.equal(true);
        });
    });
});