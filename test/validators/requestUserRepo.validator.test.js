const should = require('should'); // eslint-disable-line
const { requestUserRepoValidator } = require('../../src/validators/requestUserRepo.validator');

describe('Validator RequestUserRepo Test', () => {
    it('Should be rejected if has not user', async () => {
        const data = {};
        await requestUserRepoValidator(data).should.be.rejectedWith('required-user');
    });

    it('Should be rejected if user is not a string', async () => {
        const data = { user: 456 };
        await requestUserRepoValidator(data).should.be.rejectedWith('type-user');
    });

    it('Should be rejected if has not repoId', async () => {
        const data = { user: 'any123' };
        await requestUserRepoValidator(data).should.be.rejectedWith('required-repoId');
    });

    it('Should be rejected if repoId is not a number', async () => {
        const data = { user: 'any123', repoId: '123456' };
        await requestUserRepoValidator(data).should.be.rejectedWith('type-repoId');
    });

    it('Should be accepted if has valids user and repoId', async () => {
        const data = { user: 'any123', repoId: 123456 };
        const result = await requestUserRepoValidator(data);
        result.should.be.true();
    });
});