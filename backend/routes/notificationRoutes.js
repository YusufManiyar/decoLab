const express = require('express');
const {getAllNotificationById, allNotificationRead, collaborationRead} = require('../controller/notificationController');
const router = express.Router();

router.get('/all/:id', getAllNotificationById);
router.patch('/all-read', allNotificationRead);
router.patch('/collaboration-read', collaborationRead);

module.exports = router;