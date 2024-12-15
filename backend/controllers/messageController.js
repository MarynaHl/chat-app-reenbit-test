const Message = require('../models/Message');
const { getRandomQuote } = require('../utils/quotable');

const getMessagesForChat = async (req, res) => {
    try {
        const messages = await Message.find({ chatId: req.params.chatId });
        res.json(messages);
    } catch (err) {
        console.error('Error fetching messages:', err.message);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

const sendMessage = async (req, res) => {
    const { text } = req.body;

    try {
        const newMessage = new Message({ chatId: req.params.chatId, text });
        await newMessage.save();

        // Автовідповідь через 3 секунди
        setTimeout(async () => {
            try {
                const quote = await getRandomQuote();
                const autoResponse = new Message({
                    chatId: req.params.chatId,
                    text: quote,
                    isAutoResponse: true,
                });
                await autoResponse.save();
            } catch (err) {
                console.error('Error generating auto-response:', err.message);
            }
        }, 3000);

        res.json(newMessage);
    } catch (err) {
        console.error('Error sending message:', err.message);
        res.status(500).json({ error: 'Failed to send message' });
    }
};

module.exports = { getMessagesForChat, sendMessage };
