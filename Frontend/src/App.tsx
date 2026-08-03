import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Help from "./components/Help";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  // Track logged in user, default is null
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  return (
    <Router>
      <nav style={{ margin: '10px 0' }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/help">Help</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        {loggedInUser && <Link to="/dashboard">Dashboard</Link>}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="/dashboard"
          element={
            loggedInUser ? (
              <Dashboard
                user={loggedInUser}
                setLoggedInUser={setLoggedInUser}
              />
            ) : (
              <Home />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
