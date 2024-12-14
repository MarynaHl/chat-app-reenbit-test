const Chat = require('../models/Chat');

// Отримання всіх чатів
const getAllChats = async (req, res) => {
    const chats = await Chat.find();
    res.json(chats);
};

// Створення нового чату
const createChat = async (req, res) => {
    const { firstName, lastName } = req.body;
    const newChat = new Chat({ firstName, lastName });
    await newChat.save();
    res.json(newChat);
};

// Оновлення чату
const updateChat = async (req, res) => {
    const { firstName, lastName } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(req.params.id, { firstName, lastName }, { new: true });
    res.json(updatedChat);
};

// Видалення чату
const deleteChat = async (req, res) => {
    await Chat.findByIdAndDelete(req.params.id);
    res.json({ success: true });
};

module.exports = { getAllChats, createChat, updateChat, deleteChat };
