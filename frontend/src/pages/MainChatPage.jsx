import React, { useEffect, useState } from 'react';
import { fetchChats, fetchMessages, sendMessage, createChat, deleteChat, updateMessage } from '../api/api';
import '../styles/MainChatPage.css';

const MainChatPage = () => {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [editingMessage, setEditingMessage] = useState(null); // Стан для редагування
    const [editedText, setEditedText] = useState(''); // Текст редагованого повідомлення

    useEffect(() => {
        fetchChats().then((res) => setChats(res.data));
    }, []);

    useEffect(() => {
        if (selectedChat) {
            const interval = setInterval(() => {
                fetchMessages(selectedChat._id).then((res) => setMessages(res.data));
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [selectedChat]);

    const selectChat = async (chat) => {
        setSelectedChat(chat);
        const res = await fetchMessages(chat._id);
        setMessages(res.data);
    };

    const handleSendMessage = async () => {
        if (!selectedChat || !newMessage.trim()) return;

        const response = await sendMessage(selectedChat._id, newMessage);
        setMessages((prevMessages) => [...prevMessages, response.data]);
        setNewMessage('');
    };

    const handleEditMessage = (msg) => {
        setEditingMessage(msg._id);
        setEditedText(msg.text);
    };

    const handleUpdateMessage = async () => {
        if (!editingMessage || !editedText.trim()) return;

        await updateMessage(editingMessage, editedText);
        const res = await fetchMessages(selectedChat._id);
        setMessages(res.data);

        setEditingMessage(null);
        setEditedText('');
    };

    return (
        <div className="chat-container">
            <div className="sidebar">
                <button onClick={() => createChat(prompt('Enter chat name'))}>Create Chat</button>
                <input
                    type="text"
                    placeholder="Search chats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <ul>
                    {chats
                        .filter((chat) =>
                            `${chat.firstName} ${chat.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((chat) => (
                            <li key={chat._id} onClick={() => selectChat(chat)}>
                                {chat.firstName} {chat.lastName}
                            </li>
                        ))}
                </ul>
            </div>
            <div className="chat-area">
                {selectedChat ? (
                    <>
                        <h2>{selectedChat.firstName} {selectedChat.lastName}</h2>
                        <div className="messages">
    {messages.map((msg) => (
        <div
            key={msg._id}
            className={`message-container ${msg.isAutoResponse ? 'received' : 'sent'}`}
        >
            <div className={`message ${msg.isAutoResponse ? 'received' : 'sent'}`}>
                {editingMessage === msg._id ? (
                    <div className="edit-mode">
                        <input
                            type="text"
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            placeholder="Edit your message..."
                        />
                        <button onClick={handleUpdateMessage} className="save-button">Save</button>
                        <button onClick={() => setEditingMessage(null)} className="cancel-button">Cancel</button>
                    </div>
                ) : (
                    <div className="message-text">{msg.text}</div>
                )}
            </div>
            <div className={`message-time ${msg.isAutoResponse ? 'left' : 'right'}`}>
                {new Date(msg.createdAt).toLocaleString()}
            </div>
            {!msg.isAutoResponse && editingMessage !== msg._id && (
                <button
                    className="edit-button"
                    onClick={() => handleEditMessage(msg)}
                >
                    Edit
                </button>
            )}
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
