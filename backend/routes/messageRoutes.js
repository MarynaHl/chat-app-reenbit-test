const express = require('express');
const Message = require('../models/Message');
const { getRandomQuote } = require('../utils/quotable');

const router = express.Router();

// Отримання повідомлень для чату
router.get('/:chatId', async (req, res) => {
    const messages = await Message.find({ chatId: req.params.chatId });
    res.json(messages);
});

// Надсилання повідомлення
router.post('/:chatId', async (req, res) => {
    const { text } = req.body;
    const newMessage = new Message({ chatId: req.params.chatId, text });
    await newMessage.save();

    // Автовідповідь через 3 секунди
    setTimeout(async () => {
        const quote = await getRandomQuote();
        const autoResponse = new Message({ chatId: req.params.chatId, text: quote, isAutoResponse: true });
        await autoResponse.save();
    }, 3000);

    res.json(newMessage);
});

module.exports = router;
