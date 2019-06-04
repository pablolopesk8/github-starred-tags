const Users = require('../models/users.model');
const { getStarredValidator } = require('../validators/getStarred.validator');

/**
 * Controller to define business rules related to repositories
 */
const controller = function () {
    /**
	 * Create clients 
	 * @param {Request} req 
	 * @param {Response} res 
	 */
    const getStarredRepositories = async (req, res) => {
        try {
            await getStarredValidator(req.params);
        } catch (e) {
            // set the message to return
            switch (e.message) {
                case "required-user":
                case "invalid-user":
                    res.status(400);
                    return res.send("A valid user from Github is required in url");
                case "invalid-tag":
                    res.status(400);
                    return res.send("If you passed tags in url, they need to be valid strings");
                default:
                    res.status(500);
                    return res.send("Error in parameters");
            }
        }
    }

    /**
	 * Create clients 
	 * @param {Request} req 
	 * @param {Response} res 
	 */
    const insertTags = async (req, res) => {

    }

    /**
	 * Create clients 
	 * @param {Request} req 
	 * @param {Response} res 
	 */
    const deleteTags = async (req, res) => {

    }

    return {
        getStarredRepositories: getStarredRepositories,
        insertTags: insertTags,
        deleteTags: deleteTags
    }
}

module.exports = controller();