const mongoose = require("mongoose");

// Define Schema
const videoSchema = new mongoose.Schema({
  videoId: { type: String, required: true, unique: true },  // Unique Video ID
  creatorName: String,  // Name of the content creator
  videoLink: String,  // Link to the actual video
  description: String,  // Description of the video
  videoPath: String,  // File path where the video is stored on the server
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;// to export
