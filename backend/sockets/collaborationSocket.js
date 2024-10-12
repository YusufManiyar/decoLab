const Collaboration = require('../models/Collaboration');
const Post = require('../models/Post');

const addNewPending = async (data) => {
    try {
        const newPending = new Collaboration(data);
        await newPending.save();
        await Post.findByIdAndUpdate(
            newPending.postId, 
            { isRequested: true },
            { new: true, runValidators: true }
        );
        return newPending;
    }catch(err) {
        console.log(err);
    }
}

const acceptCollaboration = async (id) => {
    try {
        const updatedCollaboration = await Collaboration.findByIdAndUpdate(
            id, 
            { status: 'Accepted' }, 
            { new: true, runValidators: true }
        );
        return updatedCollaboration;
    } catch (err) {
        console.error(err);
    }
};

const denyCollaboration = async (id) => {
    try {
        const updatedCollaboration = await Collaboration.findByIdAndUpdate(
            id, 
            { status: 'Declined' }, 
            { new: true, runValidators: true }
        );
        return updatedCollaboration;
    } catch (err) {
        console.error(err);
    }
};


module.exports = {
    addNewPending,
    acceptCollaboration,
    denyCollaboration
}