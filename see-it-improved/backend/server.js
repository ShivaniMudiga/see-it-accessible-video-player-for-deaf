const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const Video = require("./models/Video");  // Import Video Schema

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://shivanimudiga04:tMrvmnujxc0lF5Gm@cluster0.dolfg.mongodb.net/SeeIT?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "signVideo/");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload Route: Stores Video ID in MongoDB
app.post("/upload", upload.single("video"), async (req, res) => {
    console.log("hi hi");
  const { creatorName, videoLink } = req.body;
  const videoPath = req.file.path;
  const videoId = `video_${Math.floor(100000 + Math.random() * 900000)}`; // Unique ID
    console.log(req.body,req.file.path,videoId);
  try {
    const newVideo = new Video({ videoId, creatorName, videoLink, videoPath });
    const savedVideo = await newVideo.save();  // Store in MongoDB
    console.log(savedVideo);
    res.json({
      success: true,
      message: "Video uploaded successfully!",
      videoId,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Upload failed!" });
  }
});

app.use("/signVideo", express.static("signVideo"));

app.get("/video/:videoId", async (req, res) => {
  
    const { videoId } = req.params;
    console.log("Searching for video with videoID as : ",videoId);
    try {
        const video = await Video.findOne({ videoId });
        if (!video) {
            return res.status(404).json({ success: false, message: "Video not found" });
        }

        res.json({ success: true, videoUrl: `http://localhost:5000/${video.videoPath}` });
    } catch (error) {
        console.error("Error fetching video:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// // Route to find videoId based on description
// app.post("/getVideoId", async (req, res) => {
//   const { description } = req.body;

//   try {
//       const video = await Video.findOne({ description });
//       if (video) {
//           res.json({ success: true, videoId: video.videoId });
//       } else {
//           res.json({ success: false, message: "Video not found" });
//       }
//   } catch (error) {
//       res.status(500).json({ success: false, message: "Database error" });
//   }
// });

// // Route to serve video based on videoId
// app.get("/getVideo/:videoId", async (req, res) => {
//   console.log("inside the route getVideoID ...");
//   const { videoId } = req.params;
//   console.log("video Id is : ",videoId);
//   try {
//       const video = await Video.findOne({ videoId });
//       if (video) {
//           res.sendFile(__dirname + "/" + video.videoPath);  // Serve video file
//       } else {
//           res.status(404).json({ message: "Video not found" });
//       }
//   } catch (error) {
//       res.status(500).json({ message: "Server error" });
//   }
// });


// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
