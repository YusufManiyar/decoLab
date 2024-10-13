const express = require('express');
const {getById} = require('../controller/chatController');
const router = express.Router();

router.get('/all/:id', getById);

module.exports = router;