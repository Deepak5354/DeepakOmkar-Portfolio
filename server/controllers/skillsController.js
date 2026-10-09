const portfolioData = require('../utils/mockData');

const getSkills = (req, res) => {
  res.status(200).json(portfolioData.skills);
};

const createSkill = (req, res) => {
  const { category, name } = req.body;

  if (!category || !name) {
    return res.status(400).json({ message: 'Category and name are required.' });
  }

  if (!portfolioData.skills[category]) {
    portfolioData.skills[category] = [];
  }

  portfolioData.skills[category].push(name);
  return res.status(201).json({ message: 'Skill added successfully.' });
};

module.exports = { getSkills, createSkill };
