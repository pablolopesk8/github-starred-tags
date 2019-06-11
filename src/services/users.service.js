/**
 * Service to provide methods to work with user
 */
const Users = require('../models/users.model');
const { GetUserData } = require('../services/github.service');

const GetUserByGithubUser = async (githubUser) => {
    try {
        // try get user data from local database
        let user = await Users.findOne({ githubUser: githubUser });

        // if doesn't get user, try to get in github
        if (!user) {
            user = await GetUserData(githubUser);
        }

        return user;
    } catch (err) {
        // doesn't handle the error. Only send that up
        throw new Error(err.message);
    }

}

module.exports = { GetUserByGithubUser: GetUserByGithubUser };