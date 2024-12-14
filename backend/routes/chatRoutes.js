const express = require('express');
const Chat = require('../models/Chat');

const router = express.Router();

// Отримання всіх чатів
router.get('/', async (req, res) => {
    const chats = await Chat.find();
    res.json(chats);
});

// Створення нового чату
router.post('/', async (req, res) => {
    const { firstName, lastName } = req.body;
    const newChat = new Chat({ firstName, lastName });
    await newChat.save();
    res.json(newChat);
});

// Оновлення чату
router.put('/:id', async (req, res) => {
    const { firstName, lastName } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(req.params.id, { firstName, lastName }, { new: true });
    res.json(updatedChat);
});

// Видалення чату
router.delete('/:id', async (req, res) => {
    await Chat.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

module.exports = router;
