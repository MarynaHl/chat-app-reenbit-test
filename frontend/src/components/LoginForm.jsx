import React, { useState } from "react";
import { loginWithEmailAndPassword } from "../services/api";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      alert("Both email and password are required.");
      return;
    }

    try {
      const response = await loginWithEmailAndPassword(formData);
      if (response.success) {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userName", response.data.name);
        window.location.href = "/chat";
      } else {
        alert("Login failed. Please check your email and password.");
      }
    } catch (error) {
      alert("An error occurred while logging in. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
