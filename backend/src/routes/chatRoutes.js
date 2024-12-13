const express = require("express");
const { getChats, updateChat } = require("../controllers/chatController");
const router = express.Router();

router.get("/", getChats);
router.put("/:chatId", updateChat);

router.delete("/:chatId", deleteChat);


module.exports = router;
