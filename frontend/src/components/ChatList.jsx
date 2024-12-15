import React, { useEffect, useState } from 'react';
import { fetchChats, createChat } from '../api/api';
import '../styles/ChatList.css';

const ChatList = ({ onSelectChat }) => {
    const [chats, setChats] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchChats().then((res) => setChats(res.data));
    }, []);

    const handleCreateChat = async () => {
        const firstName = prompt('Enter first name:');
        const lastName = prompt('Enter last name:');
        if (firstName && lastName) {
            await createChat({ firstName, lastName, avatar: '/images/default-avatar.png' });
            const res = await fetchChats();
            setChats(res.data);
        }
    };

    const handleLogout = () => {
        alert('Logout successful!');
    };

    const sortedChats = [...chats].sort((a, b) => {
        const fixedUsers = ['Alice Freeman', 'Josefina Walker', 'Velazquez Piter'];
        const aName = `${a.firstName} ${a.lastName}`;
        const bName = `${b.firstName} ${b.lastName}`;

        if (fixedUsers.includes(aName) && !fixedUsers.includes(bName)) return -1;
        if (!fixedUsers.includes(aName) && fixedUsers.includes(bName)) return 1;
        return 0;
    });

    return (
        <div className="chat-list">
            <div className="chat-list-header">
                <div className="avatar-circle">
                    <img src="/images/default-avatar.png" alt="User Avatar" />
                </div>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
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
                                <img src={chat.avatar || '/images/default-avatar.png'} alt="Chat Avatar" />
                            </div>
                            <div className="chat-info">
                                <span className="chat-name">{chat.firstName} {chat.lastName}</span>
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
