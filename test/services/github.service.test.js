const should = require('should'); // eslint-disable-line
const { GetUserData, GetUserRepositoriesStarred } = require('../../src/services/github.service');

// variable to be used in tests
const validUserName = 'pablolopesk8';
const invalidUserName = 'invaliduser123456';
const zeroReposUserName = 'nelobrizola';

describe('Github Service Test', () => {
    describe('Get User Data', () => {
        it('Should be able to get user data with a valid user', async () => {
            const userData = await GetUserData(validUserName);
            userData.should.have.property('githubUser').be.type('string').and.be.equal(validUserName);
            userData.should.have.property('githubId').be.type('number');
        });

        it('Should not be able to get user data with an invalid user', async () => {
            try {
                await GetUserData(invalidUserName);
            } catch (err) {
                err.message.should.be.equal('invalid-githubuser');
            }
        });
    });

    describe('Get User Starred Repositories', () => {
        it('Should be able to get repositories, with correct data, with a valid user', async () => {
            const repos = await GetUserRepositoriesStarred(validUserName);
            repos.should.not.be.empty();
            repos[0].should.have.properties(['githubId', 'name', 'fullName', 'description', 'url', 'language']);
        });

        it('Should be able to get zero repositories with a valid user whitout starred repositories', async () => {
            const repos = await GetUserRepositoriesStarred(zeroReposUserName);
            repos.should.be.empty();
        });

        it('Should not be able to get user data with an invalid user', async () => {
            try {
                await GetUserRepositoriesStarred(invalidUserName);
            } catch (err) {
                err.message.should.be.equal('invalid-githubuser');
            }
        });
    });
});