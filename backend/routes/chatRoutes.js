const express = require('express');
const {
  getChats,
  getChat,
  createChat,
  updateChat,
  deleteChat
} = require('../controllers/chatController');

const router = express.Router();

router.route('/')
  .get(getChats)
  .post(createChat);

router.route('/:id')
  .get(getChat)
  .put(updateChat)
  .delete(deleteChat);

module.exports = router;
