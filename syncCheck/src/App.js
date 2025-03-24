import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import VideoUpload from "./components/VideoUpload.js";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-dark bg-primary">
          <div className="container">
            <a className="navbar-brand" href="/">Home</a>
            <a className="navbar-brand" href="/upload">Upload Video</a>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<h2 className="text-center">Welcome to Video Upload App</h2>} />
            <Route path="/upload" element={<VideoUpload />} />
          </Routes>
        </div>

        <footer className="bg-light text-center p-3 mt-5">
          <p className="mb-0">&copy; 2025 Video Upload App</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
