const Chat = require("../models/Chat");

const initializeChats = async () => {
  const existingChats = await Chat.find();
  if (existingChats.length === 0) {
    await Chat.insertMany([
      { name: "Chat 1" },
      { name: "Chat 2" },
      { name: "Chat 3" },
    ]);
  }
};

module.exports = initializeChats;
