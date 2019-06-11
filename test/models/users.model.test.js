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

        it('Should be have a validation for starred repositories, required githubId, name and url', () => {
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

        it('Should be have a validation for starred repositories, githubId needs to be number', () => {
            const user = new Users({
                githubUser: 'whatever',
                repositories: {
                    starred: [{
                        githubId: 'anystring'
                    }]
                }
            });

            user.validate((err) => {
                err.errors.should.have.property('repositories');
                err.errors['repositories'].errors.should.have.property('starred.0.githubId');
                err.errors['repositories'].errors['starred.0.githubId'].should.have.property('name').be.equal('CastError');
            });
        });

        it('Should be have validation for starred repositories, fullName, description and language, accepeted only strings', () => {
            const user = new Users({
                githubUser: 'whatever',
                repositories: {
                    starred: [{
                        githubId: 123456789,
                        name: 'repository-name',
                        url: 'http://github.com/username/repositoryname',
                        fullName: 123456,
                        description: 789456,
                        language: 654987
                    }]
                }
            });
            /**
             * @todo To create this kind of validation, the model needs to implement a custom validator for string attributes
             *      These validators won't be created at this moment, so, this validation won't be created too
             */
            user.validate((err) => {
                should.not.exist(err);
            });
        });

        it('Should be have validation for starred repositories, tags, accepeted only strings', () => {
            const user = new Users({
                githubUser: 'whatever',
                repositories: {
                    starred: [{
                        githubId: 123456789,
                        name: 'repository-name',
                        url: 'http://github.com/username/repositoryname',
                        fullName: 'full name of repository',
                        description: 'description of repository',
                        language: 'language of repository',
                        tags: [ 123, 456 ]
                    }]
                }
            });
            /**
             * @todo To create this kind of validation, the model needs to implement a custom validator for string attributes
             *      These validators won't be created at this moment, so, this validation won't be created too
             */
            user.validate((err) => {
                should.not.exist(err);
            });
        });

        it('Should be created only with githubUser', () => {
            const user = new Users({
                githubUser: 'whatever'
            });

            user.validate((err) => {
                should.not.exist(err);
            });
        });

        it('Should be created with githubUser and some other properties', () => {
            const user = new Users({
                githubUser: 'whatever',
                other: 123,
                someOther: [1, 'a']
            });

            user.validate((err) => {
                should.not.exist(err);
            });
        });

        it('Should be created with repositories, but without starred property', () => {
            const user = new Users({
                githubUser: 'whatever',
                repositories: {
                    someProperty: 'some test'
                }
            });

            user.validate((err) => {
                should.not.exist(err);
            });
        });

        it('Should be created with repositories, and with starred property', () => {
            const user = new Users({
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

            user.validate((err) => {
                should.not.exist(err);
            });
        });

        it('Should be created with repositories, and with starred properties containing tags', () => {
            const user = new Users({
                githubUser: 'whatever',
                repositories: {
                    starred: [
                        {
                            githubId: 123456789,
                            name: 'repository-name',
                            url: 'http://github.com/username/repositoryname',
                            tags: [ 'tag1', 'tag2' ]
                        },
                        {
                            githubId: 987654,
                            name: 'name-repository',
                            url: 'http://github.com/nameuser/namerepository',
                            tags: [ 'tag11', 'tag22' ]
                        }
                    ]
                }
            });

            user.validate((err) => {
                should.not.exist(err);
            });
        });
    });
});