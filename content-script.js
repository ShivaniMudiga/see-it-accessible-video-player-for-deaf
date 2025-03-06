console.log("🎥 Content Script Loaded!");

// Wait until a video element is found
function detectVideo() {
    let video = document.querySelector("video");

    if (video) {
        console.log("✅ Video Found! Listening for events...");

        // Send status messages to the extension
        function sendStatus(action) {
            chrome.runtime.sendMessage({ status: action }, (response) => {
                if (chrome.runtime.lastError) {
                    console.warn("Side Panel may not be open yet.");
                }
            });
        }

        video.addEventListener("play", () => sendStatus("Playing"));
        video.addEventListener("pause", () => sendStatus("Paused"));
        video.addEventListener("seeked", () => {
            if (video.currentTime > lastTime + 2) {
                sendStatus("Fast Forwarded");
            } else if (video.currentTime < lastTime - 2) {
                sendStatus("Rewinded");
            }
            lastTime = video.currentTime;
        });

        let lastTime = video.currentTime; // Track last time for fast forward/rewind
    } else {
        setTimeout(detectVideo, 1000); // Retry if video not found
    }
}

detectVideo();
