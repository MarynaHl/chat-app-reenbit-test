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
            await createChat({ firstName, lastName });
            const res = await fetchChats();
            setChats(res.data);
        }
    };

    return (
        <div className="chat-list">
            <button onClick={handleCreateChat}>Create Chat</button>
            <input
                type="text"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ul>
                {chats
                    .filter((chat) => `${chat.firstName} ${chat.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((chat) => (
                        <li key={chat._id} onClick={() => onSelectChat(chat)}>{chat.firstName} {chat.lastName}</li>
                    ))}
            </ul>
        </div>
    );
};

export default ChatList;
