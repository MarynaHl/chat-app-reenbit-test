import React, { useState } from "react";
import { sendMessageToChat } from "../services/api";
import { toast } from "react-toastify";

const ChatWindow = ({ activeChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    // Відображення повідомлення користувача
    setMessages((prev) => [...prev, { text: newMessage, sender: "You" }]);

    // Відправка повідомлення на сервер
    const response = await sendMessageToChat(activeChat.id, newMessage);
    if (response.success) {
      setTimeout(() => {
        const botMessage = response.data.message;

        // Додавання авто-відповіді до чату
        setMessages((prev) => [...prev, { text: botMessage, sender: "Bot" }]);

        // Відображення сповіщення
        toast.info(`New message from Bot: "${botMessage}"`);
      }, 3000); // Імітація затримки
    }

    setNewMessage("");
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
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSendMessage();
        }}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatWindow;
