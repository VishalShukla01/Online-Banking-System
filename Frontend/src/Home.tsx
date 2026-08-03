import React from "react";

const Home: React.FC = () => (
  <div style={{
    minHeight: "calc(100vh - 80px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "3em",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  }}>
    <div style={{
      background: "white",
      borderRadius: "20px",
      padding: "3em",
      maxWidth: "600px",
      textAlign: "center",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    }}>
      <h1 style={{
        fontSize: "2.5em",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "0.5em",
      }}>
        🏦 Welcome to Simple Bank
      </h1>
      <p style={{
        fontSize: "1.2em",
        color: "#555",
        lineHeight: "1.6",
        marginBottom: "1.5em",
      }}>
        This is a modern bank management demo website for our college presentation.
      </p>
      <div style={{
        display: "flex",
        gap: "1em",
        justifyContent: "center",
        flexWrap: "wrap",
      }}>
        <a href="/register" style={{
          padding: "1em 2em",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          textDecoration: "none",
          borderRadius: "10px",
          fontWeight: "600",
          boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
          transition: "all 0.3s ease",
        }}>
          Get Started
        </a>
        <a href="/login" style={{
          padding: "1em 2em",
          background: "white",
          color: "#667eea",
          textDecoration: "none",
          borderRadius: "10px",
          fontWeight: "600",
          border: "2px solid #667eea",
          transition: "all 0.3s ease",
        }}>
          Login
        </a>
      </div>
    </div>
  </div>
);

export default Home;
