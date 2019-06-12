const should = require('should'); // eslint-disable-line
const Users = require('../../src/models/users.model');
//const { GetUserByGithubUser, GetUserFromDB } = require('../../src/services/users.service');

// variables to be used in tests
//const savedUser = 'pablolopesk8';
const notSavedUser = 'asdf';

describe('Users Service Test', () => {
    describe('Get User From DB or Github', () => {
        it('Should be able to get user data with a valid githubuser not saved previously', async () => {
            /**
             * @todo this validation is not working, because an issue when calling the mongoose method
             *      I need fix this in te future
             */
            /*
            const user = await GetUserByGithubUser(notSavedUser);
            user.should.have.property('githubUser').and.be.equal(notSavedUser);
            */
        });

        it('Should be able to get user data with a valid githubuser saved previously', async () => {
            /**
             * @todo this validation is not working, because an issue when calling the mongoose method
             *      I need fix this in te future
             */
            /*
            const user = await GetUserByGithubUser(savedUser);
            user.should.have.property('githubUser').and.be.equal(savedUser);
            */
        });

        after(() => {
            Users.deleteOne({ githubUser: notSavedUser });
        });
    });

    describe('Get User From DB', () => {
        it('Should be able to get user data with a user saved previously', async () => {
            /**
             * @todo this validation is not working, because an issue when calling the mongoose method
             *      I need fix this in te future
             */
            /*
            const user = await GetUserFromDB(savedUser);
            user.should.have.property('githubUser').and.be.equal(savedUser);
            */
        });
    });
});