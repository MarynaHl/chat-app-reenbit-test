import React, { useState } from "react";

const EditChatModal = ({ chat, onClose, onUpdate }) => {
  const [chatName, setChatName] = useState(chat.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...chat, name: chatName });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Chat</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            required
          />
          <button type="submit">Save</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditChatModal;
