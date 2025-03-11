chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url.includes("youtube.com")) {
      chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["content-script.js"]
      }).catch((error) => console.warn("Script execution failed:", error));
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.status) {
      chrome.runtime.sendMessage(message); // Relay to side panel
  }
});


