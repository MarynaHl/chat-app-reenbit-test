import React, { useState } from "react";
import { registerUser } from "../services/api";

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await registerUser(formData);
      if (response.success) {
        alert("Registration successful! You can now log in.");
        window.location.href = "/";
      } else {
        alert(response.message || "Registration failed.");
      }
    } catch (error) {
      alert("An error occurred during registration. Please try again.");
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
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
