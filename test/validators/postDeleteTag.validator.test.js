const should = require('should'); // eslint-disable-line
const { postDeleteTagsValidator } = require('../../src/validators/postDeleteTags.validator');

describe('Validator PostInsertTag Test', () => {
    it('Should be rejected if has not tags array', async () => {
        const data = {};
        await postDeleteTagsValidator(data).should.be.rejectedWith('required-tags');
    });

    it('Should be rejected if tags array is empty', async () => {
        const data = { tags: [] };
        await postDeleteTagsValidator(data).should.be.rejectedWith('minItems-tags');
    });

    it('Should be rejected if any tag is not string', async () => {
        const data = { tags: ['tag1', 123] };
        await postDeleteTagsValidator(data).should.be.rejectedWith('type-tags');
    });

    it('Should be accepted if has an array of string tags', async () => {
        const data = { tags: ['tag1', '123'] };
        const result = await postDeleteTagsValidator(data);
        result.should.be.true();
    });
});