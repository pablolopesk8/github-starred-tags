const should = require('should'); // eslint-disable-line
require('dotenv').config({ path: __dirname + '/../../src/env/.env' });
//const mongoose = require('mongoose');
const { GetUserData, GetUserRepositoriesStarred } = require('../../src/services/github.service');

describe('Github Service Test', () => {
    describe('Get User Data', () => {
        it('Should be able to get user data with a valid user', async () => {
            const userName = 'pablolopesk8';
            const userData = await GetUserData(userName);
            userData.should.have.property('githubUser').be.type('string').and.be.equal(userName);
            userData.should.have.property('githubId').be.type('number');
        });

        it('Should not be able to get user data with an invalid user', async () => {
            try {
                const userName = 'invaliduser123456';
                await GetUserData(userName);
            } catch (err) {
                err.message.should.be.equal('invalid-githubuser');
            }
        });
    });

    describe('Get User Starred Repositories', () => {
        it('Should be able to get repositories, with correct data, with a valid user', async () => {
            const userName = 'pablolopesk8';
            const repos = await GetUserRepositoriesStarred(userName);
            repos.should.not.be.empty();
            repos[0].should.have.properties(['githubId', 'name', 'fullName', 'description', 'url', 'language']);
        });

        it('Should be able to get zero repositories with a valid user whitout starred repositories', async () => {
            const userName = 'nelobrizola';
            const repos = await GetUserRepositoriesStarred(userName);
            repos.should.be.empty();
        });

        it('Should not be able to get user data with an invalid user', async () => {
            try {
                const userName = 'invaliduser123456';
                await GetUserRepositoriesStarred(userName);
            } catch (err) {
                err.message.should.be.equal('invalid-githubuser');
            }
        });
    });
});