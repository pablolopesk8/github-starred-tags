const should = require('should'); // eslint-disable-line
const { requestTagsValidator } = require('../../src/validators/requestTags.validator');

describe('Validator RequestTags Test', () => {
    it('Should be rejected if has not tags array', async () => {
        const data = {};
        await requestTagsValidator(data).should.be.rejectedWith('required-tags');
    });

    it('Should be rejected if any tag is not string', async () => {
        const data = { tags: ['tag1', 123] };
        await requestTagsValidator(data).should.be.rejectedWith('type-tags');
    });

    it('Should be accepted if has an array of string tags', async () => {
        const data = { tags: ['tag1', '123'] };
        const result = await requestTagsValidator(data);
        result.should.be.true();
    });
});