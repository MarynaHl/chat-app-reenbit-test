const Message = require("../models/Message");

const updateMessage = async (req, res) => {
  const { messageId } = req.params;
  const { text } = req.body;
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { text },
      { new: true }
    );
    if (!updatedMessage) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }
    res.json({ success: true, data: updatedMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { updateMessage };
