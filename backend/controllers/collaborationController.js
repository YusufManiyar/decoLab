const Collaboration = require('../models/Collaboration');

exports.requestCollaboration = async (req, res) => {
    const { recipientId, projectId } = req.body;
    const requesterId = req.user.id;

    try {
        const collaboration = new Collaboration({ requester: requesterId, recipient: recipientId, project: projectId });
        await collaboration.save();
        res.status(201).json(collaboration);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
