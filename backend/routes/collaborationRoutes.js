const express = require('express');
const { requestCollaboration } = require('../controllers/collaborationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/request', authMiddleware, requestCollaboration);

module.exports = router;