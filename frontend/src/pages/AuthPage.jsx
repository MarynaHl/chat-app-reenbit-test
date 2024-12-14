import React from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import LoginForm from "../components/LoginForm";
import "../styles/auth.css";

const AuthPage = () => {
  return (
    <div className="auth-page">
      <h1>Welcome to Chat</h1>
      <GoogleLoginButton />
      <LoginForm />
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
