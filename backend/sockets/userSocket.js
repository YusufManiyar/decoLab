const mongoose = require('mongoose');
const User = require('../models/user');

const requestFollower = async (userId, followerId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const followerObjectId = new mongoose.Types.ObjectId(followerId);
        if (user.profile.followers.some(fo => fo.equals(followerObjectId))) {
            return null;
        }
        user.profile.followers.push(followerObjectId);
        const updatedUser = await user.save();

        console.log('updatedUser:', updatedUser);
        return updatedUser;
    } catch (err) {
        console.error(err);
        throw new Error('Error updating followers');
    }
};


const getMe = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (err) {
        console.log(err);
        throw new Error('Error updating followers');
    }
}

module.exports = {
    requestFollower,
    getMe,
}