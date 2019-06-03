const should = require('should'); // eslint-disable-line
const Users = require('../../src/models/users.model');

describe('Model User Test', () => {
    describe('Model validation tests', () => {
        it('Should be have a validation for githubUser required', () => {
            const user1 = new Users({});

            user1.validate((err) => {
                err.errors.should.have.property('githubUser');
                err.errors['githubUser'].should.have.property('message').be.equal('githubUser is required');
            });
        });

        it('Should be have a validation for starred repositories, if exists, required githubId, name and url', () => {
            const user3 = new Users({
                githubUser: 'whatever',
                repositories: {
                    starred: [{}]
                }
            });

            user3.validate((err) => {
                err.errors.should.have.property('repositories');
                err.errors['repositories'].errors.should.have.property('starred.0.githubId');
                err.errors['repositories'].errors['starred.0.githubId'].should.have.property('message').be.equal('githubId is required');
                err.errors['repositories'].errors.should.have.property('starred.0.name');
                err.errors['repositories'].errors['starred.0.name'].should.have.property('message').be.equal('name is required');
                err.errors['repositories'].errors.should.have.property('starred.0.url');
                err.errors['repositories'].errors['starred.0.url'].should.have.property('message').be.equal('url is required');
            });
        });

        it('Should be created only with githubUser', () => {
            const user4 = new Users({
                githubUser: 'whatever'
            });

            user4.validate((err) => {
                should.not.exist(err);
            });
        });

        it('Should be created with githubUser and some other properties', () => {
            const user5 = new Users({
                githubUser: 'whatever',
                other: 123,
                someOther: [1,'a']
            });

            user5.validate((err) => {
                should.not.exist(err);
            });
        });

        it('Should be created with repositories, but without starred property', () => {
            const user6 = new Users({
                githubUser: 'whatever',
                repositories: {
                    someProperty: 'some test'
                }
            });

            user6.validate((err) => {
                should.not.exist(err);
            });
        });

        it('Should be created with repositories, and with starred property', () => {
            const user7 = new Users({
                githubUser: 'whatever',
                repositories: {
                    starred: [
                        {
                            githubId: 123456789,
                            name: 'repository-name',
                            url: 'http://github.com/username/repositoryname'
                        }
                    ]
                }
            });

            user7.validate((err) => {
                should.not.exist(err);
            });
        });
    });
});