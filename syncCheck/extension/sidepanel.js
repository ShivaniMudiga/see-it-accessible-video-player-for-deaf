chrome.runtime.onMessage.addListener((message) => {
    let statusText = document.getElementById("status");
    let sideVideo = document.getElementById("sideVideo");

    if (!sideVideo) return;

    if (message.status) {
        statusText.textContent = `Status: ${message.status}`;

        if (message.status === "Playing") {
            sideVideo.play();
        } else if (message.status === "Paused") {
            sideVideo.pause();
        } else if (message.status === "Seeked" || message.status === "SyncCheck") {
            let timeDiff = Math.abs(sideVideo.currentTime - message.currentTime);
            if (timeDiff > 0.5) { // Adjust only if difference is more than 0.5 sec
                console.log(`🔄 Syncing video to: ${message.currentTime}`);
                sideVideo.currentTime = message.currentTime;
            }
        } else if (message.status === "SpeedChanged") {
            console.log(`⚡ Adjusting playback speed to: ${message.playbackRate}`);
            sideVideo.playbackRate = message.playbackRate;
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
