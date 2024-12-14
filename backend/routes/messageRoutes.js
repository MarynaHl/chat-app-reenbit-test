const express = require("express");
const { updateMessage } = require("../controllers/messageController");
const router = express.Router();

router.put("/:messageId", updateMessage);

module.exports = router;
