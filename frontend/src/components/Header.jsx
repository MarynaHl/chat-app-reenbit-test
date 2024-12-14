import React from "react";

const Header = () => {
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    window.location.href = "/";
  };

  return (
    <header className="chat-header">
      <div className="user-info">
        <div className="avatar">{userName ? userName[0].toUpperCase() : "U"}</div>
        <span>{userName || "Guest"}</span>
      </div>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </header>
  );
};

export default Header;
