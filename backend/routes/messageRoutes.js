const express = require('express');
const mongoose = require('mongoose');
const Message = require('../models/Message');
const { getMessagesForChat, sendMessage } = require('../controllers/messageController');

const router = express.Router();

// Маршрут для отримання всіх повідомлень для конкретного чату
router.get('/:chatId', getMessagesForChat);

// Маршрут для створення нового повідомлення
router.post('/:chatId', sendMessage);

// Маршрут для оновлення існуючого повідомлення
router.put('/:id', async (req, res) => {
    const { text } = req.body;

    // Перевірка на коректність ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid message ID' });
    }

    // Перевірка на пустий текст
    if (!text || text.trim() === '') {
        return res.status(400).json({ message: 'Message text cannot be empty' });
    }

    try {
        const updatedMessage = await Message.findByIdAndUpdate(
            req.params.id,
            { text },
            { new: true } // Повертає оновлений документ
        );

        if (!updatedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.json(updatedMessage);
    } catch (err) {
        console.error('Error updating message:', err.message);
        res.status(500).json({ message: 'Failed to update message', error: err.message });
    }
});

module.exports = router;
