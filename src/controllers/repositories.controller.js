const { getStarredValidator } = require('../validators/getStarred.validator');
const { requestUserRepoValidator } = require('../validators/requestUserRepo.validator');
const { requestTagsValidator } = require('../validators/requestTags.validator');
const { GetUserByGithubUser, GetUserFromDB } = require('../services/users.service');
const Users = require('../models/users.model');

/**
 * Controller to define business rules related to repositories
 */
const controller = function () {
    /**
	 * Get starred repositories, filtering by tag or not
	 * @param {Request} req 
	 * @param {Response} res 
	 */
    const getStarredRepositories = async (req, res) => {
        try {
            // create a params with user and tags, got from req
            const params = { user: req.user, tags: req.params.tags ? req.params.tags.split(',') : undefined };

            // call method to validate data
            await getStarredValidator(params);

            // get user from any source (db or github)
            const user = await GetUserByGithubUser(params.user);

            // get the starred repositories
            let { starred: starredRepos } = user.repositories;

            // if there are tags, filter the starred
            if (params.tags) {
                starredRepos = starredRepos.filter((item) => item.tags.some((tagItem) => params.tags.indexOf(tagItem) >= 0));
            }

            res.status(200);
            return res.send({ repositories: starredRepos });
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
	 * Update tags of one repository
	 * @param {Request} req 
	 * @param {Response} res 
	 */
    const updateTags = async (req, res) => {
        try {
            // create a params with user and repoId, got from req
            const params = { user: req.user, repoId: req.params.repoId };

            // call methods to validate data
            await requestUserRepoValidator(params);
            await requestTagsValidator(req.body);

            // get user data from local database
            const user = await GetUserFromDB(params.user);

            // filter the starred repos, by repoId passed
            const repoIndex = user.repositories && user.repositories.starred ? user.repositories.starred.findIndex((item) => item.githubId == params.repoId) : -1;
            if (repoIndex === -1) {
                throw new Error("nonexisting-repoId");
            }

            // changed the specific repository tags, and update then on local database
            user.repositories.starred[repoIndex].tags = req.body.tags;
            await Users.updateOne({ githubUser: user.githubUser }, { $set: { repositories: { starred: user.repositories.toJSON().starred } } });

            res.status(200);
            return res.send({ tags: user.repositories.starred[repoIndex].tags });
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
        updateTags: updateTags
    }
}

module.exports = controller();