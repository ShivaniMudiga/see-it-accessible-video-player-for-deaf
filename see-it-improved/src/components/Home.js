import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { FaLink, FaUpload, FaKey, FaCopy, FaSearch } from "react-icons/fa";
import overviewImg from "../assets/icon.png"; // Import image
import './Home.css'; // Import the CSS file

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state

  const handleUploadClick = () => {
    setLoading(true);
    // Simulate an async operation (e.g., fetching data)
    setTimeout(() => {
      setLoading(false);
      navigate("/VideoUpload");
    }, 2000); // Simulate a 2-second loading time
  };

  return (
    <>
       {/* Navbar */}
       <header className="header">
        <div className="container d-flex justify-content-between align-items-center py-3">
          <div className="d-flex align-items-center">
            <h1 className="text-white fw-bold">SeeIt</h1>
          </div>
          <nav>
            <ul className="nav">
              <li className="nav-item"><a className="nav-link fw-semibold" href="#overview">Overview</a></li>
              <li className="nav-item"><a className="nav-link fw-semibold" href="#benefits">Benefits</a></li>
              <li className="nav-item"><a className="nav-link fw-semibold" href="#guide">Guide</a></li>
              <li className="nav-item"><a className="nav-link fw-semibold" href="#extension">Extension</a></li>
              <li className="nav-item"><a className="nav-link fw-semibold" href="#team">Team</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Overview Section */}
      <section id="overview" className="section-overview">
        <div className="wide-container d-flex align-items-center">
          <img src={overviewImg} alt="Overview Illustration" className="img-fluid rounded me-4" width="400" />
          <div>
            <h2 className="fw-bold text-home">Welcome to SeeIt</h2>
            <p className="lead text-home">SeeIt is a platform designed to make online video content more accessible to the deaf community.
        It allows content creators to upload sign language videos that sync with original content, ensuring inclusive experiences.
        With our browser extension, viewers can seamlessly watch sign language translations alongside the main video.</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="section-benefits py-5">
        <div className="wide-container text-center">
          <h2 className="fw-bold">Why Choose SeeIt?</h2>
          <p className="lead">SeeIt offers unique features that enhance accessibility and inclusivity.</p>

          {/* Features Grid */}
         {/* Features Grid */}
<div className="row justify-content-center mt-4">
  <div className="col-md-4 d-flex">
    <div className="card w-100 shadow-sm p-3 text-center">
      <i className="bi bi-universal-access fs-1 text-primary"></i> {/* Bootstrap Icon */}
      <h4 className="fw-semibold mt-3">Enhanced Accessibility</h4>
      <p>SeeIt ensures video content is inclusive for the deaf community by providing synchronized sign language translations.</p>
    </div>
  </div>

  <div className="col-md-4 d-flex">
    <div className="card w-100 shadow-sm p-3 text-center">
      <i className="bi bi-puzzle fs-1 text-primary"></i> {/* Bootstrap Icon */}
      <h4 className="fw-semibold mt-3">Seamless Integration</h4>
      <p>Our browser extension allows easy integration with online videos, making sign language support effortless.</p>
    </div>
  </div>

  <div className="col-md-4 d-flex">
    <div className="card w-100 shadow-sm p-3 text-center">
      <i className="bi bi-emoji-smile fs-1 text-primary"></i> {/* Bootstrap Icon */}
      <h4 className="fw-semibold mt-3">User-Friendly</h4>
      <p>Simple and intuitive design that makes it easy for anyone to use and contribute to the platform.</p>
    </div>
  </div>
</div>

<div className="row justify-content-center mt-4">
  <div className="col-md-4 d-flex">
    <div className="card w-100 shadow-sm p-3 text-center">
      <i className="bi bi-film fs-1 text-primary"></i> {/* Bootstrap Icon */}
      <h4 className="fw-semibold mt-3">Revamp Older Videos with Ease</h4>
      <p>Quickly incorporate sign language videos into existing content without the need for tedious editing.</p>
    </div>
  </div>

  <div className="col-md-4 d-flex">
    <div className="card w-100 shadow-sm p-3 text-center">
      <i className="bi bi-globe fs-1 text-primary"></i> {/* Bootstrap Icon */}
      <h4 className="fw-semibold mt-3">Global Accessibility</h4>
      <p>Creators can add multiple sign language videos for one content, allowing viewers to choose their preferred sign language.</p>
    </div>
  </div>
</div>

        </div>
      </section>

{/* How It Works Section */}
<section className="py-5">
  <div className="wide-container">
    <div className="row">
      
{/* How the App Works Section */}
<div id="guide" className="col-md-6 text-center p-4 border-end">
  <h3 className="fw-bold">How the App Works</h3>

  {/* Step-by-Step Layout */}
  <div className="row mt-4 d-flex justify-content-center">

    {/* Step 1: Provide Video URL */}
    <div className="col-md-4 d-flex flex-column align-items-center">
      <div className="position-relative">
        <div className={`step-circle step-1`}>
          1
        </div>
      </div>
      <FaLink size={40} className="text-primary mt-3" />
      <h5 className="fw-semibold mt-2">Enter Video URL</h5>
      <p className="small">Paste the link of your original video.</p>
    </div>

    {/* Step 2: Upload Sign Language Video */}
    <div className="col-md-4 d-flex flex-column align-items-center">
      <div className="position-relative">
        <div className={`step-circle step-2`}>
          2
        </div>
      </div>
      <FaUpload size={40} className="text-warning mt-3" />
      <h5 className="fw-semibold mt-2">Upload Sign Video</h5>
      <p className="small">Upload the corresponding sign language video.</p>
    </div>

    {/* Step 3: Get Unique ID */}
    <div className="col-md-4 d-flex flex-column align-items-center">
      <div className="position-relative">
        <div className={`step-circle step-3`}>
          3
        </div>
      </div>
      <FaKey size={40} className="text-success mt-3" />
      <h5 className="fw-semibold mt-2">Receive Unique ID</h5>
      <p className="small">A unique ID is generated for your sign video.</p>
    </div>

  </div>

  {/* Second Row */}
  <div className="row mt-4 d-flex justify-content-center">

    {/* Step 4: Copy ID to Video */}
    <div className="col-md-4 d-flex flex-column align-items-center">
      <div className="position-relative">
        <div className={`step-circle step-4`}>
          4
        </div>
      </div>
      <FaCopy size={40} className="text-danger mt-3" />
      <h5 className="fw-semibold mt-2">Attach ID</h5>
      <p className="small">Copy the ID to the actual video description.</p>
    </div>

    {/* Step 5: Users Enter ID in Extension */}
    <div className="col-md-4 d-flex flex-column align-items-center">
      <div className="position-relative">
        <div className={`step-circle step-5`}>
          5
        </div>
      </div>
      <FaSearch size={40} className="text-info mt-3" />
      <h5 className="fw-semibold mt-2">Users Enter ID</h5>
      <p className="small">Viewers enter the ID to sync sign video with actual video.</p>
    </div>

  </div>

  {/* Button */}
  <button className="btn btn-primary fw-semibold mt-4" onClick={handleUploadClick}>
    {loading ? (
      <i className="fas fa-spinner fa-spin"></i> // Loader icon
    ) : (
      "Upload Sign Video"
    )}
  </button>
</div>
{/* How the Extension Works */}
<div id="extension" className="col-md-6 d-flex flex-column align-items-center text-center p-4">
  <h3 className="fw-bold">Extension</h3>

  <div className="d-flex flex-column align-items-center" style={{ maxWidth: "600px" }}>
    <p></p>
    <p className="lead">
      Our browser extension enhances accessibility by allowing viewers to watch sign language translations in sync 
      with their favorite videos. Whether it's educational content, entertainment, or tutorials, the extension ensures 
      that deaf and hard-of-hearing users can fully engage with online media.
    </p>

    <p className="lead">
      Simply install the extension, enter the unique ID linked to a sign language video, and the extension will 
      automatically overlay the sign translation alongside the main video in perfect synchronization. It's lightweight, 
      user-friendly, and supports major video platforms like YouTube without affecting video performance.
    </p>
  </div>

  <a href="https://chromewebstore.google.com/" target="_blank" rel="noopener noreferrer">
  <button className="btn btn-success fw-semibold mt-3">Download Now</button>
</a>

</div>
{/* Meet the Team Section */}
<section id="team" className="py-5 bg-light text-center">
  <div className="container">
    <h2 className="fw-bold">Contact Us</h2>
    <div className="row justify-content-center mt-4">
      
      {/* Team Member 1 */}
      <div className="col-md-3 d-flex flex-column align-items-center">
        <h5 className="fw-semibold">Mudiga Shivani</h5>
        <p className="small">Team Member</p>
        <div>
          <a href="https://www.linkedin.com/in/shivani-mudiga-13271033b/" className="me-3 text-primary" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-linkedin fs-4"></i>
          </a>
          <a href="https://github.com/ShivaniMudiga" className="text-dark" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-github fs-4"></i>
          </a>
        </div>
      </div>

      {/* Team Member 2 */}
      <div className="col-md-3 d-flex flex-column align-items-center">
        <h5 className="fw-semibold">Kodipyaka Sujana Gupta</h5>
        <p className="small">Team Member</p>
        <div>
          <a href="https://www.linkedin.com/in/sujana-gupta-kodipyaka-824a6b33a/" className="me-3 text-primary" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-linkedin fs-4"></i>
          </a>
          <a href="https://github.com/ksujanagupta" className="text-dark" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-github fs-4"></i>
          </a>
        </div>
      </div>
      {/* Team Member 3 */}
      <div className="col-md-3 d-flex flex-column align-items-center">
        <h5 className="fw-semibold">Gampa Anupama</h5>
        <p className="small">Team Member</p>
        <div>
          <a href="https://www.linkedin.com/in/sujana-gupta-kodipyaka-824a6b33a/" className="me-3 text-primary" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-linkedin fs-4"></i>
          </a>
          <a href="https://github.com/gampa-anupama" className="text-dark" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-github fs-4"></i>
          </a>
        </div>
      </div>

      

    </div>
  </div>
</section>

    </div>
  </div>
</section>


    </>
  );
}



export default Home;
