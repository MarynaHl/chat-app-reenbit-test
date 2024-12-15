import React, { useEffect, useState } from 'react';
import { fetchChats, fetchMessages, sendMessage, updateMessage } from '../api/api';
import '../styles/MainChatPage.css';
import ChatList from '../components/ChatList';
import ToastNotification from '../components/ToastNotification';

const MainChatPage = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [editingMessage, setEditingMessage] = useState(null);
    const [editedText, setEditedText] = useState('');
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        if (selectedChat) {
            const interval = setInterval(() => {
                fetchMessages(selectedChat._id).then((res) => {
                    if (res.data.length > messages.length) {
                        setToastMessage('You have a new message!');
                    }
                    setMessages(res.data);
                });
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [selectedChat, messages]);

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
            {toastMessage && <ToastNotification message={toastMessage} onClose={() => setToastMessage('')} />}
            <ChatList onSelectChat={setSelectedChat} />
            <div className="chat-area">
                {selectedChat ? (
                    <>
                        <h2>{selectedChat.firstName} {selectedChat.lastName}</h2>
                        <div className="messages">
                            {messages.map((msg) => (
                                <div key={msg._id} className={`message-container ${msg.isAutoResponse ? 'received' : 'sent'}`}>
                                    <div className={`message ${msg.isAutoResponse ? 'received' : 'sent'}`}>
                                        {editingMessage === msg._id ? (
                                            <div className="edit-mode">
                                                <input type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} />
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
                                        <button className="edit-button" onClick={() => handleEditMessage(msg)}>Edit</button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="input-area">
                            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
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
