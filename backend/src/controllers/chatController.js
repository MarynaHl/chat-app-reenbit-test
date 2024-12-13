const Chat = require("../models/Chat");

const updateChat = async (req, res) => {
  const { chatId } = req.params;
  const { name } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(chatId, { name }, { new: true });
    if (!updatedChat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }
    res.json({ success: true, data: updatedChat });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { updateChat };
const deleteChat = async (req, res) => {
  const { chatId } = req.params;

  try {
    const deletedChat = await Chat.findByIdAndDelete(chatId);
    if (!deletedChat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }
    res.json({ success: true, message: "Chat deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { updateChat, deleteChat };
