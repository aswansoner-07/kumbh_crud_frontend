import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/Landingpage";
import CRUDPage from "./components/CRUDPage"; // Example CRUD page

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/crud" element={<CRUDPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
