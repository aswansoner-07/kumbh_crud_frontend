import React from "react";
import { Link } from "react-router-dom";
import './styles/Landingpage.css'
const Landingpage = () => {
  return (
    <div className="home-container">
      <h1 className="home-heading">Welcome to the Kumbh Advertise CRUD Application</h1>
      <p className="home-description">
        This application is designed to manage records efficiently using modern technologies
        like MongoDB, Express.js, React.js, and Node.js. Navigate through the app to add, edit,
        view, or delete records.
      </p>
      <div className="home-buttons">
        <Link to="/crud" className="home-button">
          Manage Records
        </Link>
        <a
          href="https://github.com/aswansoner-07"
          target="_blank"
          rel="noopener noreferrer"
          className="home-button"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default Landingpage;
