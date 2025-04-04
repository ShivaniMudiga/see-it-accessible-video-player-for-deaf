console.log("🎥 Content Script Loaded!");

// Wait until a video element is found
function detectVideo() {
    let video = document.querySelector("video");

    if (video) {
        console.log("✅ Video Found! Listening for events...");

        // Send status messages to the extension
        function sendStatus(action, time = null, speed = null) {
            chrome.runtime.sendMessage({ 
                status: action, 
                currentTime: time, 
                playbackRate: speed 
            }, (response) => {
                if (chrome.runtime.lastError) {
                    console.warn("⚠️ Side Panel may not be open yet.");
                }
            });
        }

        // Sync play/pause
        video.addEventListener("play", () => sendStatus("Playing", video.currentTime, video.playbackRate));
        video.addEventListener("pause", () => sendStatus("Paused", video.currentTime, video.playbackRate));

        // Sync seeking
        video.addEventListener("seeked", () => {
            if (!isNaN(video.currentTime)) {
                console.log(`⏩ Seeked to: ${video.currentTime}`);
                sendStatus("Seeked", video.currentTime, video.playbackRate);
            } else {
                console.warn("⚠️ Invalid currentTime detected.");
            }
        });

        // Sync playback speed
        video.addEventListener("ratechange", () => {
            console.log(`⚡ Speed changed: ${video.playbackRate}`);
            sendStatus("SpeedChanged", video.currentTime, video.playbackRate);
        });

        // Continuous sync check
        setInterval(() => sendStatus("SyncCheck", video.currentTime, video.playbackRate), 1000);
    } else {
        setTimeout(detectVideo, 1000); // Retry if video not found
    }
}

detectVideo();




