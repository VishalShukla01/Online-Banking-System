import React from "react";

const Help: React.FC = () => (
  <div style={{
    minHeight: "calc(100vh - 80px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2em",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  }}>
    <div style={{
      background: "white",
      borderRadius: "20px",
      padding: "3em",
      maxWidth: "800px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    }}>
      <h2 style={{
        fontSize: "2em",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "1em",
      }}>
        ❓ Help & Support
      </h2>
      
      <div style={{ marginBottom: "2em" }}>
        <h3 style={{ color: "#2c3e50", marginBottom: "0.5em" }}>
          How to Get Started
        </h3>
        <ol style={{ lineHeight: "2", color: "#555", paddingLeft: "1.5em" }}>
          <li>Register a new account using the Register page</li>
          <li>Login with your credentials</li>
          <li>Access your dashboard to manage transactions</li>
          <li>Use Quick Actions to deposit or withdraw money</li>
          <li>Transfer money to other demo accounts</li>
        </ol>
      </div>

      <div style={{ marginBottom: "2em" }}>
        <h3 style={{ color: "#2c3e50", marginBottom: "0.5em" }}>
          Available Features
        </h3>
        <ul style={{ lineHeight: "2", color: "#555", paddingLeft: "1.5em" }}>
          <li>💰 Deposit and Withdraw Money</li>
          <li>💸 Transfer to Other Accounts</li>
          <li>📜 View Transaction History</li>
          <li>💳 Real-time Balance Updates</li>
        </ul>
      </div>

      <div style={{
        background: "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
        padding: "1.5em",
        borderRadius: "12px",
      }}>
        <p style={{
          fontSize: "1em",
          color: "#666",
          margin: 0,
        }}>
          📧 <strong>Need more help?</strong> This is a demo project for educational purposes. 
          For questions, contact your project team.
        </p>
      </div>
    </div>
  </div>
);

export default Help;
