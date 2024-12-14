import React, { useState, useEffect } from 'react';
import ChatList from './ChatList'; 
import NewChatForm from './NewChatForm'; 
import Chat from './Chat'; 
import { createChat, sendMessage } from './api'; 
import './App.css';

function App() {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);

  const handleCreateChat = async (chatData) => {
    const newChat = await createChat(chatData);
    if (newChat) {
      setChats([...chats, newChat]);
    }
  };

  const handleSendMessage = async (message) => {
    if (selectedChatId) {
      const updatedChat = await sendMessage(selectedChatId, message);
      if (updatedChat) {
        const updatedChats = chats.map(chat =>
          chat.id === updatedChat.id ? updatedChat : chat
        );
        setChats(updatedChats);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat Application</h1>
      </header>
      <main>
        <NewChatForm onSubmit={handleCreateChat} />
        <ChatList chats={chats} onSelectChat={setSelectedChatId} />
        {selectedChatId && <Chat sendMessage={handleSendMessage} />}
      </main>
    </div>
  );
}

export default App;
