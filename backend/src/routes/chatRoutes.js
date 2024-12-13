const express = require("express");
const { sendMessage } = require("../controllers/messageController");
const router = express.Router();

router.post("/:chatId/messages", sendMessage);

module.exports = router;
