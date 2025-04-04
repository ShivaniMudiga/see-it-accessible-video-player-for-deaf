import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import VideoUpload from "./components/VideoUpload";
 // Ensure this exists

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/VideoUpload" element={<VideoUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
