import React, { useEffect, useState } from 'react';
import { fetchChats, createChat, updateChat, deleteChat, fetchMessages } from '../api/api';
import '../styles/ChatList.css';

const ChatList = ({ onSelectChat }) => {
    const [chats, setChats] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchChatsWithMessages();
    }, []);

    const fetchChatsWithMessages = async () => {
        const chats = await fetchChats();
        const updatedChats = await Promise.all(
            chats.data.map(async (chat) => {
                const messages = await fetchMessages(chat._id);
                const lastMessageText = messages.data[messages.data.length - 1]?.text || '';
                const truncatedMessage = lastMessageText.length > 15
                    ? `${lastMessageText.slice(0, 15)}...`
                    : lastMessageText;
                return { ...chat, lastMessage: truncatedMessage };
            })
        );
        setChats(updatedChats);
    };    

    const handleCreateChat = async () => {
        const firstName = prompt('Enter first name:');
        const lastName = prompt('Enter last name:');
        if (firstName && lastName) {
            await createChat({ firstName, lastName, avatar: '/images/default-avatar.png' });
            await fetchChatsWithMessages();
        }
    };

    const handleEditChat = async (chat) => {
        const firstName = prompt('Edit first name:', chat.firstName);
        const lastName = prompt('Edit last name:', chat.lastName);
        if (firstName && lastName) {
            await updateChat(chat._id, { firstName, lastName });
            await fetchChatsWithMessages();
        }
    };

    const handleDeleteChat = async (chatId) => {
        if (window.confirm('Are you sure you want to delete this chat?')) {
            await deleteChat(chatId);
            await fetchChatsWithMessages();
        }
    };

    const sortedChats = [...chats].sort((a, b) => {
        const fixedUsers = ['Alice Freeman', 'Josefina Walker', 'Velazquez Piter'];
        const aName = `${a.firstName} ${a.lastName}`;
        const bName = `${b.firstName} ${b.lastName}`;
        const aIsFixed = fixedUsers.includes(aName);
        const bIsFixed = fixedUsers.includes(bName);

        if (aIsFixed && !bIsFixed) return -1;
        if (!aIsFixed && bIsFixed) return 1;
        return aName.localeCompare(bName);
    });

    return (
        <div className="chat-list">
            <div className="chat-list-header">
                <div className="avatar-circle">
                    <img src="/images/default-avatar.png" alt="User Avatar" />
                </div>
                <button className="logout-button">Logout</button>
            </div>
            <input
                type="text"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
            />
            <h3 className="chat-title">Chats</h3>
            <ul>
                {sortedChats
                    .filter((chat) =>
                        `${chat.firstName} ${chat.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((chat) => (
                        <li key={chat._id} onClick={() => onSelectChat(chat)} className="chat-item">
                            <div className="avatar-circle">
                                <img
                                    src={chat.avatar || '/images/default-avatar.png'}
                                    alt="Chat Avatar"
                                />
                            </div>
                            <div className="chat-info">
                                <span className="chat-name">
                                    {chat.firstName} {chat.lastName}
                                </span>
                                <span className="last-message">
                                    {chat.lastMessage || 'No messages yet'}
                                </span>
                            </div>
                            <div className="chat-actions">
                                <button onClick={() => handleEditChat(chat)} className="edit-chat">
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteChat(chat._id)} className="delete-chat">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
            </ul>
            <button onClick={handleCreateChat} className="create-chat-button">
                Create Chat
            </button>
        </div>
    );
};

export default ChatList;
