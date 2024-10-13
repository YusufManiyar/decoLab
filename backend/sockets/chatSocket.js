const Chat = require('../models/Chat');

const addChat = async (data) => {
    try {
        const newChat = new Chat(data);
        await newChat.save();
        return newChat;
    }catch(err) {
        console.log('Server error:', err);
    }
}

module.exports = {
    addChat,
}