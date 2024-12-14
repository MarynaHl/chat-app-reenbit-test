import React from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "../styles/auth.css";

const AuthPage = () => {
  return (
    <div className="auth-page">
      <h1>Welcome to Chat</h1>
      <GoogleLoginButton />
      <h2>Login</h2>
      <LoginForm />
      <h2>Register</h2>
      <RegisterForm />
      <button
        onClick={() => {
          window.location.href = "/chat";
        }}
        className="test-login-btn"
      >
        Test Login
      </button>
    </div>
  );
};

export default AuthPage;
