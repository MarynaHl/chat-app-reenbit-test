import React from 'react';

function ChatList({ chats, onSelectChat }) {
  return (
    <div>
      <ul>
        {chats.map(chat => (
          <li key={chat.id} onClick={() => onSelectChat(chat.id)}>
            {chat.firstName} {chat.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
