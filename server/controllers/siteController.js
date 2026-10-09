const portfolioData = require('../utils/mockData');

const healthCheck = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Portfolio API is running.',
    timestamp: new Date().toISOString(),
  });
};

const getPortfolioOverview = (req, res) => {
  res.status(200).json({
    profile: portfolioData.profile,
    skills: portfolioData.skills,
    experience: portfolioData.experience,
    education: portfolioData.education,
    certifications: portfolioData.certifications,
    projects: portfolioData.projects,
  });
};

const getGitHubData = async (req, res) => {
  try {
    res.status(200).json({
      profile: portfolioData.github.profile,
      repositoryCount: portfolioData.github.repositoryCount,
      followers: portfolioData.github.followers,
      contributions: portfolioData.github.contributions,
      popularRepositories: portfolioData.github.popularRepositories,
      recentRepositories: portfolioData.github.recentRepositories,
      languageDistribution: portfolioData.github.languageDistribution,
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch GitHub data.' });
  }
};

module.exports = { healthCheck, getPortfolioOverview, getGitHubData };
