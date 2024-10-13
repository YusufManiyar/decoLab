const Chat = require('../models/Chat');
const User = require('../models/user');

const getById = async (req, res) => {
    try {
        const { id } = req.params;

        const chats = await Chat.find({ receiverId: id })
            .populate('senderId')
            .populate('receiverId');

        if (!chats.length) {
            return res.status(404).json({ ok: false, message: 'Chats not found' });
        }

        const formattedChats = chats.map(chat => ({
            sender: chat.senderId,
            receiver: chat.receiverId,
            message: chat.message,
            files: chat.files,
        }));

        return res.status(200).json({ ok: true, chats: formattedChats });
    } catch (err) {
        return res.status(500).json({ ok: false, message: 'Server error' });
    }
};


module.exports = {
    getById,
}