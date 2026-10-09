const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { getSkills, createSkill } = require('../controllers/skillsController');

const router = express.Router();

router.get('/', getSkills);
router.post('/', authenticateToken, createSkill);

module.exports = router;
