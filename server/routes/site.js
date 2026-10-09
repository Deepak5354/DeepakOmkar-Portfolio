const express = require('express');
const { getPortfolioOverview, getGitHubData, healthCheck } = require('../controllers/siteController');

const router = express.Router();

router.get('/health', healthCheck);
router.get('/portfolio', getPortfolioOverview);
router.get('/github', getGitHubData);

module.exports = router;
