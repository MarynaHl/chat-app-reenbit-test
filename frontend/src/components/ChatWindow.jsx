import React, { useState, useEffect } from "react";
import { sendMessageToChat, updateMessage } from "../services/api";
import socket from "../services/socket";

const ChatWindow = ({ activeChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingMessage, setEditingMessage] = useState(null);

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      chatId: activeChat?.id || "global",
      sender: "You",
      text: newMessage,
      timestamp: new Date(),
    };

    socket.emit("send_message", message);
    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  const handleEditMessage = async () => {
    if (!editingMessage.text.trim()) return;

    const response = await updateMessage(editingMessage.id, editingMessage.text);
    if (response.success) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === editingMessage.id ? { ...msg, text: editingMessage.text } : msg
        )
      );
      setEditingMessage(null);
    }
  };

  if (!activeChat) {
    return <div className="chat-window">Select a chat to start messaging</div>;
  }

  return (
    <div className="chat-window">
      <h2>{activeChat.name}</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <span>{msg.sender}: {msg.text}</span>
            {msg.sender === "You" && (
              <button onClick={() => setEditingMessage(msg)}>Edit</button>
            )}
          </div>
        ))}
      </div>
      {editingMessage ? (
        <div>
          <input
            type="text"
            value={editingMessage.text}
            onChange={(e) =>
              setEditingMessage({ ...editingMessage, text: e.target.value })
            }
          />
          <button onClick={handleEditMessage}>Save</button>
          <button onClick={() => setEditingMessage(null)}>Cancel</button>
        </div>
      ) : (
        <div>
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
      )}
    </div>
  );
};

export default ChatWindow;
