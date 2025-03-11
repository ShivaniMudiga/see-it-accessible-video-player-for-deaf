// domcontentloaded not requried as we want to listen to it all the times but not only when loaded 
// document.addEventListener("DOMContentLoaded", () => {
//     let statusText = document.getElementById("status");

//     chrome.runtime.onMessage.addListener((message) => {
//         if (message.status) {
//             statusText.textContent = `Status: ${message.status}`;
//         }
//     });
// });

chrome.runtime.onMessage.addListener((message) => {
    let statusText = document.getElementById("status");
    let sideVideo = document.getElementById("sideVideo");

    if (message.status) {
        statusText.textContent = `Status: ${message.status}`;

        if (message.status === "Playing") {
            sideVideo.play();
        } else if (message.status === "Paused") {
            sideVideo.pause();
        } else if (message.status === "Fast Forwarded" || message.status === "Rewinded") {
            console.log(`🔄 Syncing video to: ${message.currentTime}`);
            sideVideo.currentTime = message.currentTime; // Sync time
        }
    }
});

// Fetch video from backend using Unique Video ID
document.getElementById("fetchVideoBtn").addEventListener("click", async () => {
    const videoId = document.getElementById("videoIdInput").value.trim();
    if (!videoId) {
        alert("Please enter a valid Video ID!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/video/${videoId}`);
        const data = await response.json();

        if (data.success) {
            document.getElementById("videoSource").src = data.videoUrl;
            document.getElementById("sideVideo").load();
        } else {
            alert("Video not found!");
        }
    } catch (error) {
        console.error("Error fetching video:", error);
        alert("Failed to load video.");
    }
});
