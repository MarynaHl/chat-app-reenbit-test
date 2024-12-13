import React, { useState } from "react";

const ChatWindow = ({ activeChat }) => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    setMessages((prev) => [...prev, { text: message, sender: "You" }]);
    // Для автозаповнення відповіді додамо логіку пізніше
  };

  if (!activeChat) {
    return <div className="chat-window">Select a chat to start messaging</div>;
  }

  return (
    <div className="chat-window">
      <h2>{activeChat.name}</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>{msg.sender}: {msg.text}</div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSendMessage(e.target.value);
        }}
      />
    </div>
  );
};

export default ChatWindow;
