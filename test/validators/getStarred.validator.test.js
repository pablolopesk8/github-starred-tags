const should = require('should'); // eslint-disable-line
const { getStarredValidator } = require('../../src/validators/getStarred.validator');

describe('Validator GetStarred Test', () => {
    it('Should be rejected if has not user', async () => {
        const data = {};
        await getStarredValidator(data).should.be.rejectedWith('required-user');
    });

    it('Should be rejected if user is not a string', async () => {
        const data = { user: 456 };
        await getStarredValidator(data).should.be.rejectedWith('type-user');
    });

    it('Should be rejected if has tag and it is not string', async () => {
        const data = { user: 'any123', tags: [ 123 ]};
        await getStarredValidator(data).should.be.rejectedWith('type-tag');
    });

    it('Should be accepted if has an user', async () => {
        const data = { user: 'any123' };
        const result = await getStarredValidator(data);
        result.should.be.true();
    });

    it('Should be accepted if has an user and array of string tags', async () => {
        const data = { user: 'any123', tags: [ 'tag1' ] };
        const result = await getStarredValidator(data);
        result.should.be.true();
    });
});