const { getStarredValidator } = require('../validators/getStarred.validator');
const { requestUserRepoValidator } = require('../validators/requestUserRepo.validator');
const { postDeleteTagsValidator } = require('../validators/postDeleteTags.validator');
const { GetUserByGithubUser, GetUserFromDB } = require('../services/users.service');

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

            // get user from any source (db or github)
            await GetUserByGithubUser(req.params.user);
        } catch (e) {
            // set the message to return
            switch (e.message) {
                case "required-user":
                case "type-user":
                case "invalid-githubuser":
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

            // get user from local database
            const user = await GetUserFromDB(req.params.user);

            // filter the starred repos, by repoId passed
            const repoIndex = user.repositories && user.repositories.starred ? user.repositories.starred.findIndex((item) => item.githubId === req.params.repoId) : -1;

            // if doesn't get a repo, throw error
            if (repoIndex === -1) {
                throw new Error("nonexisting-repoId");
            }
        } catch (e) {
            // set the message to return
            switch (e.message) {
                case "required-user":
                case "type-user":
                    res.status(400);
                    return res.send("A valid user from Github is required in url");
                case "nonexistent-user":
                    res.status(400);
                    return res.send("An existing user is required in url");
                case "required-repoId":
                case "type-repoId":
                    res.status(400);
                    return res.send("A valid repoId from Github is required in url");
                case "nonexisting-repoId":
                    res.status(400);
                    return res.send("An existing repoId is required in url");
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

            // try to get user from local database
            await GetUserFromDB(req.params.user);
        } catch (e) {
            // set the message to return
            switch (e.message) {
                case "required-user":
                case "type-user":
                    res.status(400);
                    return res.send("A valid user from Github is required in url");
                case "nonexistent-user":
                    res.status(400);
                    return res.send("An existing user is required in url");
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