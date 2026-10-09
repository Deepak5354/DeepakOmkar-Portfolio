const portfolioData = require('../utils/mockData');

const getProjects = (req, res) => {
  res.status(200).json(portfolioData.projects);
};

const getProjectBySlug = (req, res) => {
  const project = portfolioData.projects.find((item) => item.slug === req.params.slug);

  if (!project) {
    return res.status(404).json({ message: 'Project not found.' });
  }

  return res.status(200).json(project);
};

const createProject = (req, res) => {
  const project = {
    id: Date.now().toString(),
    ...req.body,
    slug: req.body.name?.toLowerCase().replace(/\s+/g, '-'),
    featured: Boolean(req.body.featured),
  };

  portfolioData.projects.unshift(project);
  return res.status(201).json(project);
};

const updateProject = (req, res) => {
  const index = portfolioData.projects.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Project not found.' });
  }

  const updated = { ...portfolioData.projects[index], ...req.body };
  portfolioData.projects[index] = updated;
  return res.status(200).json(updated);
};

const deleteProject = (req, res) => {
  const projectIndex = portfolioData.projects.findIndex((item) => item.id === req.params.id);

  if (projectIndex === -1) {
    return res.status(404).json({ message: 'Project not found.' });
  }

  portfolioData.projects.splice(projectIndex, 1);
  return res.status(200).json({ message: 'Project deleted successfully.' });
};

module.exports = { getProjects, getProjectBySlug, createProject, updateProject, deleteProject };
