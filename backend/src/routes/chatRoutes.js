const express = require("express");
const { getChats } = require("../controllers/chatController");
const router = express.Router();

router.get("/", getChats);

module.exports = router;
