/**
 * Service to provide methods to work with user
 */
const Users = require('../models/users.model');
const { GetUserData: GetGithubUserData, GetUserRepositoriesStarred: GetReposStarred } = require('./github.service');

/**
 * Method to get user data from any source (local DB or Github)
 * @param {String} githubUser
 * @returns user data
 * @throws {Error}
 */
const GetUserByGithubUser = async (githubUser) => {
    try {
        // try get user data from local database
        let user = await Users.findOne({ githubUser: githubUser });

        // if doesn't get user, try to get in github
        if (!user) {
            user = await GetGithubUserData(githubUser);
            const starred = await GetReposStarred(githubUser);

            // save the user, with starred repos, into local db
            Users.create({ githubUser: user.githubUser, repositories: { starred: starred } }, (err, created) => {
                if (err) {
                    throw new Error(err.message);
                }

                return created;
            });
        } else {
            // if user exists in local DB, get starred repos on Github and update locally
            const starred = await GetReposStarred(githubUser);

            // if user has starred repositories previously, update the starred got on github with tags existing
            if (user.repositories && user.repositories.starred && user.repositories.starred.length > 0) {
                for (let i = 0, len = starred.length; i < len; i++) {
                    // check if the current repository exists in user
                    let currentRepo = user.repositories.starred.filter((item) => item.githubId === starred[i].githubId);
                    if(currentRepo.length > 0) {
                        starred[i].tags = currentRepo[0].tags;
                    }
                }
            }

            // update user and set the starred into the object
            await Users.updateOne({ githubUser: user.githubUser }, { $set: { repositories: { starred: starred } } });
            user.repositories = { starred: starred };
            user = user.toJSON();
        }

        return user;
    } catch (err) {
        // doesn't handle the error. Only send that up
        throw new Error(err.message);
    }
}

const GetUserFromDB = async (githubUser) => {
    try {
        // try get user data from local database
        const user = await Users.findOne({ githubUser: githubUser });

        // if doesn't get user, throw an error
        if (!user) {
            throw new Error('nonexistent-user');
        } else {
            return user;
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { GetUserByGithubUser: GetUserByGithubUser, GetUserFromDB: GetUserFromDB };