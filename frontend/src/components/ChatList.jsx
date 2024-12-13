import React, { useState } from "react";
import EditChatModal from "./EditChatModal";

const ChatList = ({ setActiveChat }) => {
  const [chats, setChats] = useState([
    { id: 1, name: "Chat 1" },
    { id: 2, name: "Chat 2" },
    { id: 3, name: "Chat 3" },
  ]);
  const [editingChat, setEditingChat] = useState(null);

  const handleUpdateChat = (updatedChat) => {
    setChats((prevChats) =>
      prevChats.map((chat) => (chat.id === updatedChat.id ? updatedChat : chat))
    );
  };

  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <div key={chat.id}>
          <span onClick={() => setActiveChat(chat)}>{chat.name}</span>
          <button onClick={() => setEditingChat(chat)}>Edit</button>
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

const handleDeleteChat = (chatId) => {
  setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
};

return (
  <div className="chat-list">
    {chats.map((chat) => (
      <div key={chat.id}>
        <span onClick={() => setActiveChat(chat)}>{chat.name}</span>
        <button onClick={() => setEditingChat(chat)}>Edit</button>
        <button onClick={() => handleDeleteChat(chat.id)}>Delete</button>
      </div>
    ))}
  </div>
);

export default ChatList;
