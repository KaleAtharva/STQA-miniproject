import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Auth({ setUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/users/login" : "/users/register";
      const response = await API.post(endpoint, { username, email, password });

      // Set the logged-in user in the parent component
      setUser(response.data.user);

      // Navigate to dashboard after successful registration/login
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during authentication:", error);
      // Optionally handle the error, e.g., show an alert or set an error state
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleAuth} className="auth-form">
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {!isLogin && (
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <button
        className="auth-toggle-button"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Switch to Register" : "Switch to Login"}
      </button>
    </div>
  );
}

export default Auth;
