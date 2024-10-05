const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    twitterHandle: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
    collaborations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Collaboration'}],
});

module.exports = mongoose.model('User', userSchema);