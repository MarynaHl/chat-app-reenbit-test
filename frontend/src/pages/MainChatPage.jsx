import React, { useEffect, useState } from 'react';
import { fetchChats, fetchMessages, sendMessage, createChat, deleteChat } from '../api/api';
import '../styles/MainChatPage.css';

const MainChatPage = () => {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchChats().then((res) => setChats(res.data));
    }, []);

    useEffect(() => {
        if (selectedChat) {
            const interval = setInterval(() => {
                fetchMessages(selectedChat._id).then((res) => setMessages(res.data));
            }, 3000);

            return () => clearInterval(interval); // Очищення інтервалу
        }
    }, [selectedChat]);

    const selectChat = async (chat) => {
        setSelectedChat(chat);
        const res = await fetchMessages(chat._id);
        setMessages(res.data);
    };

    const handleSendMessage = async () => {
        if (!selectedChat || !newMessage.trim()) return;
    
        // Відправка повідомлення на сервер
        const response = await sendMessage(selectedChat._id, newMessage);
    
        // Миттєве оновлення повідомлень у локальному стані
        setMessages((prevMessages) => [...prevMessages, response.data]);
    
        setNewMessage(''); // Очищення поля вводу
    };

    const handleCreateChat = async () => {
        const firstName = prompt('Enter first name:');
        const lastName = prompt('Enter last name:');
        if (!firstName || !lastName) return;

        await createChat({ firstName, lastName });
        const res = await fetchChats();
        setChats(res.data);
    };

    const handleDeleteChat = async (id) => {
        if (window.confirm('Are you sure you want to delete this chat?')) {
            await deleteChat(id);
            const res = await fetchChats();
            setChats(res.data);
        }
    };

    return (
        <div className="chat-container">
            <div className="sidebar">
                <button onClick={handleCreateChat}>Create Chat</button>
                <input
                    type="text"
                    placeholder="Search chats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <ul>
                    {chats
                        .filter((chat) =>
                            `${chat.firstName} ${chat.lastName}`
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                        )
                        .map((chat) => (
                            <li
                                key={chat._id}
                                onClick={() => selectChat(chat)}
                                className={selectedChat?._id === chat._id ? 'active' : ''}
                            >
                                {chat.firstName} {chat.lastName}
                                <button onClick={() => handleDeleteChat(chat._id)}>Delete</button>
                            </li>
                        ))}
                </ul>
            </div>
            <div className="chat-area">
                {selectedChat ? (
                    <>
                        <h2>{selectedChat.firstName} {selectedChat.lastName}</h2>
                        <div className="messages">
                            {messages.map((msg, index) => (
                                <div key={index} className={msg.isAutoResponse ? 'message auto' : 'message'}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className="input-area">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                            />
                            <button onClick={handleSendMessage}>Send</button>
                        </div>
                    </>
                ) : (
                    <p>Select a chat to start messaging.</p>
                )}
            </div>
        </div>
    );
};

export default MainChatPage;
