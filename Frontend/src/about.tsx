import React from "react";

const About: React.FC = () => (
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
      maxWidth: "700px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    }}>
      <h2 style={{
        fontSize: "2em",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "1em",
      }}>
        About Simple Bank
      </h2>
      <p style={{
        fontSize: "1.1em",
        color: "#555",
        lineHeight: "1.8",
        marginBottom: "1em",
      }}>
        <strong>Simple Bank</strong> is a demo project showcasing modern banking features built using the MERN stack (MongoDB, Express, React, Node.js).
      </p>
      <p style={{
        fontSize: "1.1em",
        color: "#555",
        lineHeight: "1.8",
        marginBottom: "1em",
      }}>
        This project demonstrates core banking functionalities including account management, money transfers, deposits, withdrawals, and transaction history tracking.
      </p>
      <div style={{
        background: "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
        padding: "1.5em",
        borderRadius: "12px",
        marginTop: "1.5em",
      }}>
        <p style={{
          fontSize: "1em",
          color: "#666",
          fontStyle: "italic",
          margin: 0,
        }}>
  Manage your accounts, track transactions, and transfer funds seamlessly
  with a secure and intuitive banking system.
</p>
      </div>
    </div>
  </div>
);

export default About;
