import React, { useState } from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import Header from "../components/Header";
import "../styles/chat.css"

const MainChat = () => {
  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className="main-chat">
      <Header />
      <div className="chat-container">
        <ChatList setActiveChat={setActiveChat} />
        <ChatWindow activeChat={activeChat} />
      </div>
    </div>
  );
};

export default MainChat;
