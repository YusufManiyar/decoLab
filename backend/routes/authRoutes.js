const express = require('express');
const passport = require('passport');
const {register, emailLogin, updateUser} = require('../controller/authController');
const router = express.Router();

router.post('/register', register);
router.post('/email-login', emailLogin);
router.patch('/update', passport.authenticate('jwt', {session: false}), updateUser);

module.exports = router;