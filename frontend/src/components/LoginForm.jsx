import React, { useState } from "react";
import { loginWithTestAccount } from "../services/api";

const LoginForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Both name and email are required.");
      return;
    }

    try {
      const response = await loginWithTestAccount(formData);
      if (response.success) {
        localStorage.setItem("userId", response.data.userId);
        window.location.href = "/chat";
      } else {
        alert("Login failed. Please check your name and email.");
      }
    } catch (error) {
      alert("An error occurred while logging in. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
