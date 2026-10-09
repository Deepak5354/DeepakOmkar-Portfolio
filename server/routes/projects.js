const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { getProjects, getProjectBySlug, createProject, updateProject, deleteProject } = require('../controllers/projectController');

const router = express.Router();

router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', authenticateToken, createProject);
router.put('/:id', authenticateToken, updateProject);
router.delete('/:id', authenticateToken, deleteProject);

module.exports = router;
