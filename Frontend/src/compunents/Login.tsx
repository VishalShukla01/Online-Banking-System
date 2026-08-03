import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  setLoggedInUser: (username: string) => void;
};

const Login: React.FC<LoginProps> = ({ setLoggedInUser }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Send login request to backend
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert(`Welcome back, ${form.username}!`);
        setLoggedInUser(form.username);
        navigate('/dashboard');
      } else {
        alert(data.message || 'Login failed!');
      }
    } catch (error) {
      alert('Cannot connect to server. Make sure backend is running!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "calc(100vh - 80px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2em",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "white",
        borderRadius: "20px",
        padding: "3em",
        width: "100%",
        maxWidth: "450px",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
      }}>
        <h2 style={{
          fontSize: "2em",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "1.5em",
          textAlign: "center",
        }}>
          🔐 Login
        </h2>
        
        <label>
          <span style={{ fontWeight: "600", color: "#2c3e50" }}>Username</span>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
          />
        </label>
        
        <label>
          <span style={{ fontWeight: "600", color: "#2c3e50" }}>Password</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </label>
        
        <button type="submit" disabled={loading} style={{
          width: "100%",
          padding: "1em",
          background: loading ? "#ccc" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          marginTop: "1em",
          fontSize: "1.1em",
          cursor: loading ? "not-allowed" : "pointer",
        }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        
        <p style={{
          textAlign: "center",
          marginTop: "1.5em",
          color: "#666",
        }}>
          Don't have an account? <a href="/register" style={{
            color: "#667eea",
            fontWeight: "600",
            textDecoration: "none",
          }}>Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
