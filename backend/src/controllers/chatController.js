const getChats = (req, res) => {
  const chats = [
    { id: 1, name: "Chat 1" },
    { id: 2, name: "Chat 2" },
    { id: 3, name: "Chat 3" },
  ];
  res.json({ success: true, data: chats });
};

module.exports = { getChats };
