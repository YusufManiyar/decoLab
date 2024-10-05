const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verifyTwitterHandle } = require('../utils/twitterUtils');

exports.register = async (req, res) => {
    const { twitterHandle, password } = req.body;

    try {
        const user = await verifyTwitterHandle(twitterHandle);
        if (!user) {
            return res.status(400).json({ msg: 'Twitter handle could not be verified' });
        }

        const existingUser = await User.findOne({ twitterHandle });
        if (existingUser) return res.status(400).json({ msg: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ twitterHandle, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { twitterHandle, password } = req.body;

    try {
        const user = await User.findOne({ twitterHandle });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, twitterHandle: user.twitterHandle }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token, user: { twitterHandle: user.twitterHandle } });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};