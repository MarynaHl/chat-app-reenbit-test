import React, { useState } from 'react';

function NewChatForm({ onSubmit }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ firstName, lastName });
    setFirstName('');
    setLastName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
      <button type="submit">Create Chat</button>
    </form>
  );
}

export default NewChatForm;
