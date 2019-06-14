const express = require('express');
const repositoriesRouter = express.Router();
const repositoriesController = require('../controllers/repositories.controller');

/**
 * Router to get starred repos, filtering by tags or not
 */
repositoriesRouter.route('/starred/:tags?')
    .get(repositoriesController.getStarredRepositories);

repositoriesRouter.route('/:repoId/tags')
    .patch(repositoriesController.updateTags);

module.exports = repositoriesRouter;