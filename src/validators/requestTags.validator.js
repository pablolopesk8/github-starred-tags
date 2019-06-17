const Ajv = require('ajv');
const ajv = new Ajv({errorDataPath: 'property'});

/**
 * Method to validate posted data in methods to insert and delete tags
 * @param {Object} data data for validation
 * @throws {Error} error specifying if field required (required-tags) ou invalid (type-tags)
 * @returns {boolean} true
 */
const validator = async (data) => {
    // schema to validate tags
    const schema = {
        properties: {
            tags: { type: "array", minItems: 0, items: { type: "string" } }
        },
        required: ["tags"]
    }

    // get he result of validation
    const valid = await ajv.validate(schema, data);

    // if data is not valid, set the correct message to return
    if (!valid) {
        // set the error type according keyword
        const errorType = `${ajv.errors[0].keyword}-tags`;

        // throw an error with defined type
        throw new Error(errorType);
    } else {
        // if valid, return true
        return true;
    }
}

module.exports = { requestTagsValidator: validator };