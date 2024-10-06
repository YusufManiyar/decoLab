const mongoose = require('mongoose');

const collaborationSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    type: { type: String, enum: ['AMA', 'Partnership', 'TwitterSpace', 'Custom'], required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Accepted', 'Declined'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Collaboration', collaborationSchema);