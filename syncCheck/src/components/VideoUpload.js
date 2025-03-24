import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const VideoUpload = () => {
  const [video, setVideo] = useState(null);
  const [file, setFile] = useState(null);
  const [creatorName, setCreatorName] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [videoId, setVideoId] = useState("");

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

  // Copy unique ID to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(videoId);
    setMessage("Video ID copied to clipboard!");
  };

  // Handle Video Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("No video selected!");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);
    formData.append("creatorName", creatorName);
    formData.append("videoLink", videoLink);
    formData.append("description", description);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setVideoId(response.data.videoId);
        console.log(response.data.videoId);
        setMessage(`Upload successful! Use this ID in your description: ${response.data.videoId}`);
      } else {
        setMessage("Upload failed!");
      }
    } catch (error) {
      setMessage("Upload failed!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center">Upload Your Video</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Content Creator Name */}
          <div className="mb-3">
            <label className="form-label fw-bold">Content Creator Name</label>
            <input
              type="text"
              className="form-control"
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
              required
            />
          </div>

          {/* Video Link */}
          <div className="mb-3">
            <label className="form-label fw-bold">Actual Video Link</label>
            <input
              type="url"
              className="form-control"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              required
            />
          </div>

          {/* Video Description */}
          <div className="mb-3">
            <label className="form-label fw-bold">Video Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Drop Zone */}
          <div
            {...getRootProps()}
            className="dropzone border border-primary rounded d-flex flex-column align-items-center justify-content-center p-5 mt-3"
            style={{ cursor: "pointer", minHeight: "200px" }}
          >
            <input {...getInputProps()} />
            <i className="fas fa-upload fa-3x text-primary mb-3"></i>
            <p className="text-muted text-center">
              Drag & Drop your video here <br />
              or <a href="#" onClick={open} className="text-primary fw-bold">Click here to select a file</a>
            </p>
          </div>

          {/* Video Preview */}
          {video && (
            <div className="mt-4">
              <h5>Preview:</h5>
              <video controls width="100%" className="rounded shadow">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {/* Submit Button */}
          {video && (
            <button className="btn btn-primary mt-3 w-100" type="submit">
              Submit Video
            </button>
          )}

          {/* Message Display */}
          {message && <p className="text-center mt-3 text-success">{message}</p>}

          {/* Video ID Display & Copy Button */}
          {videoId && (
            <div className="text-center mt-3">
              <p className="fw-bold">Video ID: {videoId}</p>
              <button className="btn btn-outline-primary" onClick={copyToClipboard}>
                Copy ID
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default VideoUpload;
