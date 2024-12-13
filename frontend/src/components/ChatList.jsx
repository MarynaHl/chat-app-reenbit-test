import React, { useState } from "react";
import EditChatModal from "./EditChatModal";
import SearchBar from "./SearchBar";

const ChatList = ({ setActiveChat }) => {
  const [chats, setChats] = useState([
    { id: 1, name: "Chat 1" },
    { id: 2, name: "Chat 2" },
    { id: 3, name: "Chat 3" },
  ]);
  const [filteredChats, setFilteredChats] = useState(chats);
  const [editingChat, setEditingChat] = useState(null);

  const handleSearch = (query) => {
    const result = chats.filter((chat) =>
      chat.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredChats(result);
  };

  const handleUpdateChat = (updatedChat) => {
    setChats((prevChats) =>
      prevChats.map((chat) => (chat.id === updatedChat.id ? updatedChat : chat))
    );
    handleSearch("");
  };

  const handleDeleteChat = (chatId) => {
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
  };

  return (
    <div className="chat-list">
      <SearchBar onSearch={handleSearch} />
      {filteredChats.map((chat) => (
        <div key={chat.id}>
          <span onClick={() => setActiveChat(chat)}>{chat.name}</span>
          <button onClick={() => setEditingChat(chat)}>Edit</button>
          <button onClick={() => handleDeleteChat(chat.id)}>Delete</button>
        </div>
      ))}
      {editingChat && (
        <EditChatModal
          chat={editingChat}
          onClose={() => setEditingChat(null)}
          onUpdate={handleUpdateChat}
        />
      )}
    </div>
  );
};

export default ChatList;
