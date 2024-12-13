import React from "react";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return <button onClick={handleGoogleLogin}>Login with Google</button>;
};

export default GoogleLoginButton;
