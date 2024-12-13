import React from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import LoginForm from "../components/LoginForm";

const AuthPage = () => {
  return (
    <div className="auth-page">
      <h1>Welcome to Chat</h1>
      <GoogleLoginButton />
      <LoginForm />
    </div>
  );
};

export default AuthPage;
