import React from "react";

const ChatList = ({ setActiveChat }) => {
  const chats = [
    { id: 1, name: "Chat 1" },
    { id: 2, name: "Chat 2" },
    { id: 3, name: "Chat 3" },
  ];

  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <div key={chat.id} onClick={() => setActiveChat(chat)}>
          {chat.name}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
