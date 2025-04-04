import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './VideoUpload.css'; // Import the CSS file

const VideoUpload = () => {
  const [video, setVideo] = useState(null);
  const [file, setFile] = useState(null);
  const [creatorName, setCreatorName] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [message, setMessage] = useState("");
  const [videoId, setVideoId] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "video/*",
    multiple: false,
    noClick: true,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFile(file);
        setVideo(URL.createObjectURL(file));
      }
    },
  });

  const handleNewUpload = () => {
    setFile(null);
    setVideo(null);
    setMessage("");
    setVideoId("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(videoId);
    setMessage("Video ID copied to clipboard!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!file) {
      setMessage("No video selected!");
      return;
    }
  
    if (videoId) {
      setMessage("This video is already uploaded!");
      return;
    }
  
    const formData = new FormData();
    formData.append("video", file);
    formData.append("creatorName", creatorName);
    formData.append("videoLink", videoLink);
  
    setLoading(true); // Start loading

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.data.success) {
        setVideoId((prevId) => prevId || response.data.videoId); // Set only if not already set
        setMessage("Upload successful!");
      } else {
        setMessage("Upload failed!");
      }
    } catch (error) {
      setMessage("Upload failed!");
    } finally {
      setLoading(false); // Stop loading
    }
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
              <li className="nav-item"><a className="nav-link fw-semibold" href="/">Home</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Video Upload Section */}
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow-lg p-4">
          <h3 className="text-center text-upload">Upload Your Video</h3>

          {loading ? (
            <div className="text-center">
              <i className="fas fa-spinner fa-spin fa-3x text-primary"></i> {/* Loader icon */}
              <p className="mt-2">Loading...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Content Creator Name</label>
                <input
                  type="text"
                  className="form-control shadow-sm"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Actual Video Link</label>
                <input
                  type="url"
                  className="form-control shadow-sm"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  required
                />
              </div>

              {!video ? (
                <div
                  {...getRootProps()}
                  className="dropzone d-flex flex-column align-items-center justify-content-center p-5 mt-3 bg-light shadow-sm"
                >
                  <input {...getInputProps()} />
                  <i className="fas fa-upload fa-3x text-primary mb-3"></i>
                  <p className="text-muted text-center">
                    Drag & Drop your video here <br />
                    or <a href="#" onClick={(e) => { e.preventDefault(); open(); }} className="text-primary fw-bold">Click here to select a file</a>
                  </p>
                </div>
              ) : (
                <div className="d-flex flex-column align-items-center mt-4">
                  <h5 className="text-upload">Preview:</h5>
                  <video controls className="rounded shadow-sm" style={{ width: "280px", height: "180px" }}>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="d-flex justify-content-center w-100 mt-3">
                    <button className="btn btn-danger me-2 shadow-sm" onClick={handleNewUpload}>
                      Reset Video
                    </button>
                    <button className="btn btn-primary shadow-sm" type="submit">
                      Submit Video
                    </button>
                  </div>
                </div>
              )}

              {message && (
                <p className={`text-center mt-3 ${message.includes("failed") ? "text-error" : "text-success"} fw-bold text-upload`}>
                  {message}
                </p>
              )}

              {videoId && (
                <div className="text-center mt-3">
                  <p className="fw-bold">Video ID: {videoId}</p>
                  <p className="text-muted">Add this ID to your description.</p>
                  <button className="btn btn-outline-primary shadow-sm" onClick={copyToClipboard}>
                    Copy ID
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default VideoUpload;
           