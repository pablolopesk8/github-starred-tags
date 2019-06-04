/**
 * Service to provide methods to validate repository data
 */
const Ajv = require('ajv');
const ajv = new Ajv({errorDataPath: 'property'});

/**
 * Method to validate params passed to get starred repositories
 * @param {Object} params required
 */
const validator = async (data) => {
    // schema to validate user and tags
    const schema = {
        properties: {
            user: { type: "string" },
            tags: { type: "array", items: { type: "string" } }
        },
        required: ["user"]
    }

    // get he result of validation
    const valid = await ajv.validate(schema, data);

    // if data is not valid, set the correct message to return
    if (!valid) {
        // set the error type according keyword and dataPath
        let errorType = "error";

        if (ajv.errors[0].keyword === "required") {
            errorType = "required-user";
        } else if (ajv.errors[0].keyword === "type") {
            // if validation is about string, verify the property that error
            if (ajv.errors[0].dataPath === ".user") {
                errorType = "invalid-user";
            } else {
                errorType = "invalid-tag";
            }
        }

        // throw an error with defined type
        throw new Error(errorType);
    } else {
        // if valid, return true
        return true;
    }
}

module.exports = { getStarredValidator: validator };