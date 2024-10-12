const Notification = require('../models/Notification');
const User = require('../models/user');

const addNewNotification = async (data) => {
    try {
        const newNotification = new Notification(data);
        await newNotification.save();
        const sender = await User.findById(newNotification.senderId);
        return {
            notification: newNotification,
            sender
        };
    }catch(err) {
        console.log(err);
    }
}

const acceptNotification = async (collaborationId) => {
    try {
        const updatedNotification = await Notification.findOneAndUpdate(
            { collaborationId },
            { status: "Accepted", isAnswered: true },
            { new: true }
        );

        if (!updatedNotification) {
            throw new Error('Notification not found');
        }

        return updatedNotification;
    } catch (err) {
        console.log(err);
    }
}

const denyNotification = async (collaborationId) => {
    try {
        const updatedNotification = await Notification.findOneAndUpdate(
            { collaborationId },
            { status: "Declined", isAnswered: true },
            { new: true }
        );

        if (!updatedNotification) {
            throw new Error('Notification not found');
        }

        return updatedNotification;
    } catch (err) {
        console.log(err);
    }
}

const returnAcceptedNotification = async (id) => {
    try {
        const updatedNotification = await Notification.findByIdAndUpdate(
            id,
            { isReturened: true},
            { new: true }
        );

        if (!updatedNotification) {
            throw new Error('Notification not found');
        }

        return updatedNotification;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    addNewNotification,
    acceptNotification,
    returnAcceptedNotification,
    denyNotification,
}