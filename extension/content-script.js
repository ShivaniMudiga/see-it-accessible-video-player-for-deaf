console.log("🎥 Content Script Loaded!");

// Wait until a video element is found
function detectVideo() {
    let video = document.querySelector("video");

    if (video) {
        console.log("✅ Video Found! Listening for events...");

        // Send status messages to the extension
        function sendStatus(action, time = null) {
            chrome.runtime.sendMessage({ status: action, currentTime: time }, (response) => {
                if (chrome.runtime.lastError) {
                    console.warn("⚠️ Side Panel may not be open yet.");
                }
            });
        }
        
        video.addEventListener("play", () => sendStatus("Playing", video.currentTime));
        video.addEventListener("pause", () => sendStatus("Paused", video.currentTime));
        
        video.addEventListener("seeked", () => {
            if (!isNaN(video.currentTime)) {
                console.log(`⏩ Seeked to: ${video.currentTime}`);
                sendStatus("Seeked", video.currentTime);
            } else {
                console.warn("⚠️ Invalid currentTime detected.");
            }
        });
        
        let lastTime = video.currentTime; // Track last time for fast forward/rewind
    } else {
        setTimeout(detectVideo, 1000); // Retry if video not found
    }
}

detectVideo();



