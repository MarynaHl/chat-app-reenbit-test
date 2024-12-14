const express = require('express');
const {
    getMessagesForChat,
    sendMessage,
} = require('../controllers/messageController');

const router = express.Router();

router.get('/:chatId', getMessagesForChat);
router.post('/:chatId', sendMessage);

module.exports = router;
