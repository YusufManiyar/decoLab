const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    receiverId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    message: {type: String, default: ''},
    files: [{type: String}],
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('chat', chatSchema);