const express = require('express');
const {
    getAllChats,
    createChat,
    updateChat,
    deleteChat,
} = require('../controllers/chatController');

const router = express.Router();

router.get('/', getAllChats);
router.post('/', createChat);
router.put('/:id', updateChat);
router.delete('/:id', deleteChat);

module.exports = router;
