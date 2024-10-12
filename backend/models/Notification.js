const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { 
        type: String, 
        enum: ['NewMessage', 'CollaborationRequest', 'ProjectUpdate', 'Reminder', 'Custom'], 
        required: true 
    },
    message: { type: String, default: "" },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    collaborationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Collaboration' },
    status: { type: String, enum: ['Pending', 'Accepted', 'Declined'], default: 'Pending' },
    isReturened: {type: Boolean, default: false},
}, {
    validateBeforeSave: true
});

notificationSchema.pre('validate', function(next) {
    if (this.type === 'CollaborationRequest' && !this.collaborationId) {
        return next(new Error('collaborationId is required when type is CollaborationRequest'));
    }
    next();
});

module.exports = mongoose.model('Notification', notificationSchema);
