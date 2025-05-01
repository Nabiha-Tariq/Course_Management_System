import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
      <nav style={{
        backgroundColor: "#6B21A8", // purple
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white"
      }}>
        <h2>Course Management</h2>
        <button
          onClick={() => navigate("/login")}
          style={{
            backgroundColor: "white",
            color: "#6B21A8",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Login
        </button>
      </nav>

      {/* Main Heading */}
      <div style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F3F4F6"
      }}>
        <h1 style={{ fontSize: "2.5rem", color: "#6B21A8" }}>
          Welcome to Course Management System
        </h1>
      </div>
    </div>
  );
};

export default Home;
