/**
 * Service to provide methods to integate with Github
 */
const request = require('request-promise-native');

// Get env variables
require('dotenv').config({ path: __dirname + '/../env/.env' });
const GITHUB_AUTH_USER = process.env.GITHUB_AUTH_USER;
const GITHUB_AUTH_TOKEN = process.env.GITHUB_AUTH_TOKEN;
const GITHUB_URL_BASE = process.env.GITHUB_URL_BASE;

const GetUserData = async (githubUser) => {
    // options to get user data
    const options = {
        uri: `${GITHUB_URL_BASE}/users/${githubUser}`,
        json: true,
        headers: {
            'User-Agent': GITHUB_AUTH_USER,
            'Authorization': GITHUB_AUTH_TOKEN
        }
    };

    try {
        // get the data
        let user = await request(options);

        // return only necessary infos
        return { githubUser: user.login, githubId: user.id };
    } catch (err) {
        // validate the error and set correct message
        let errorType;
        if (err.statusCode == 404) {
            errorType = 'invalid-githubuser';
        } else {
            errorType = 'generic-github';
        }

        throw new Error(errorType);
    }
}

const GetUserRepositoriesStarred = async (githubUser) => {
    // options to get the starred repos
    const options = {
        uri: `${GITHUB_URL_BASE}/users/${githubUser}/starred`,
        json: true,
        headers: {
            'User-Agent': GITHUB_AUTH_USER,
            'Authorization': GITHUB_AUTH_TOKEN
        }
    };

    try {
        // get the repos
        let repos = await request(options);
        let reposReturn = [];

        // iterate into repos, to get only necessary infos
        for (let i = 0, len = repos.length; i < len; i++) {
            reposReturn.push({
                githubId: repos[i].id,
                name: repos[i].name,
                fullName: repos[i].full_name,
                description: repos[i].description,
                url: repos[i].html_url,
                language: repos[i].language
            });
        }

        return reposReturn;
    } catch (err) {
        // validate the error and set correct message
        let errorType;
        if (err.statusCode == 404) {
            errorType = 'invalid-githubuser';
        } else {
            errorType = 'generic-github';
        }
        
        throw new Error(errorType);
    }
}

module.exports = { GetUserData: GetUserData, GetUserRepositoriesStarred: GetUserRepositoriesStarred };