const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    const { name, description, website, keyTeamMembers } = req.body;
    const userId = req.user.id;

    try {
        const project = new Project({ name, description, website, keyTeamMembers, user: userId });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};