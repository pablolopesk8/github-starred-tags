const Users = require('../models/users.model');
const { getStarredValidator } = require('../validators/getStarred.validator');
const { requestUserRepoValidator } = require('../validators/requestUserRepo.validator');
const { postDeleteTagsValidator } = require('../validators/postDeleteTags.validator');
const { GetUserData } = require('../services/github.service');

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
            // call method to validate data
            await getStarredValidator(req.params);

            // try get user data from local database
            const user = await Users.findOne({githubUser: req.params.user});
            console.log(user);
        } catch (e) {
            // set the message to return
            switch (e.message) {
                case "required-user":
                case "type-user":
                    res.status(400);
                    return res.send("A valid user from Github is required in url");
                case "type-tag":
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
        try {
            // call methods to validate data
            await requestUserRepoValidator(req.params);
            await postDeleteTagsValidator(req.body);
        } catch (e) {
            // set the message to return
            switch (e.message) {
                case "required-user":
                case "type-user":
                    res.status(400);
                    return res.send("A valid user from Github is required in url");
                case "required-repoId":
                case "type-repoId":
                    res.status(400);
                    return res.send("A valid repoId from Github is required in url");
                case "required-tags":
                case "type-tags":
                case "minItems-tags":
                    res.status(400);
                    return res.send("An array of tag strings is required");
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
    const deleteTags = async (req, res) => {
        try {
            // call methods to validate data
            await requestUserRepoValidator(req.params);
            await postDeleteTagsValidator(req.body);
        } catch (e) {
            // set the message to return
            switch (e.message) {
                case "required-user":
                case "type-user":
                    res.status(400);
                    return res.send("A valid user from Github is required in url");
                case "required-repoId":
                case "type-repoId":
                    res.status(400);
                    return res.send("A valid repoId from Github is required in url");
                case "required-tags":
                case "type-tags":
                case "minItems-tags":
                    res.status(400);
                    return res.send("An array of tag strings is required");
                default:
                    res.status(500);
                    return res.send("Error in parameters");
            }
        }
    }

    return {
        getStarredRepositories: getStarredRepositories,
        insertTags: insertTags,
        deleteTags: deleteTags
    }
}

module.exports = controller();