import React, { useState } from 'react';

function Chat({ sendMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type your message here..."
        required
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default Chat;
