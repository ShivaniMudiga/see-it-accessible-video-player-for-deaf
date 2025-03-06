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
    if (message.status) {
        document.getElementById("status").textContent = `Status: ${message.status}`;
    }
    let statusText = document.getElementById("status");
    let sideVideo = document.getElementById("sideVideo");
    if(message.status)
    {
        statusText.textContent=`Status: ${message.status}`;
        if(message.status==="Playing")
        {
            sideVideo.play();
        }
        else if (message.status==="Paused")
        {
            sideVideo.pause();
        }
    }
});

