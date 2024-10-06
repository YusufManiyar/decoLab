const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const {name, email, password, profile} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            profile
        });
        await newUser.save();
        return res.status(201).json({message: 'User registered successfully'});
    }catch (err) {
        return res.status(500).json({ message: 'Server error', err });
    }
}


exports.emailLogin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const payload = {id: user._id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'});
        
        return res.json({token: `Bearer ${token}`});
    }catch(err) {
        return res.status(500).json({ message: 'Server error', err });
    }
}

exports.updateUser = async (req, res) => {
    const userId = req.user.id;

    try {
        const updates = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, updates, {new: true, runValidators: true});
        if(!updatedUser) {
            return res.status(404).json({message: 'User not found'});
        }
        return res.json(updatedUser);
    }catch(err) {
        return res.status(500).json({message: 'Server error', error});
    }
}