import React, { useState } from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

const MainChat = () => {
  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className="main-chat">
      <ChatList setActiveChat={setActiveChat} />
      <ChatWindow activeChat={activeChat} />
    </div>
  );
};

export default MainChat;
