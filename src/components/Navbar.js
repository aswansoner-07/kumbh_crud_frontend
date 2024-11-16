import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-brand">
        Kumbh Advertise</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li>
          <Link to="/crud" className="navbar-link">Manage Records</Link>
        </li>
        <li>
          <a
            href="https://github.com/aswansoner-07"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-link"
          >
            GitHub
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
