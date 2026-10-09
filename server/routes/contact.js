const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { submitContactMessage, getContactMessages, deleteContactMessage } = require('../controllers/contactController');

const router = express.Router();

router.post('/', submitContactMessage);
router.get('/', authenticateToken, getContactMessages);
router.delete('/:id', authenticateToken, deleteContactMessage);

module.exports = router;
