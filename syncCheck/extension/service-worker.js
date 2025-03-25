// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === "complete" && tab.url.includes("youtube.com")) {
//         chrome.scripting.executeScript({
//             target: { tabId: tabId },
//             files: ["content-script.js"]
//         }).catch((error) => console.warn("Script execution failed:", error));
//     }
//   });
  
//   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.status) {
//         chrome.runtime.sendMessage(message); // Relay to side panel
//     }
//   }); //if later it doesnt work we can just use this for restricting side panel
let allowedTabId = null; // Store the tab where the panel was first opened

// Inject content script when a YouTube tab loads
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url.includes("youtube.com")) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["content-script.js"]
        }).catch((error) => console.warn("Script execution failed:", error));
    }
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.status) {
        chrome.runtime.sendMessage(message); // Relay message to the side panel
    }
});

// Handle action button click to open the side panel
chrome.action.onClicked.addListener(async (tab) => {
    if (allowedTabId === null) {
        // First time opening, store the tab ID
        allowedTabId = tab.id;
        await chrome.sidePanel.open({ tabId: tab.id });
    } else if (allowedTabId === tab.id) {
        // Allow toggling in the same tab
        await chrome.sidePanel.open({ tabId: tab.id });
    } else {
        // Block opening in another tab
        console.warn("Side panel is already open in another tab:", allowedTabId);
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icon.png",
            title: "Side Panel Restricted",
            message: "Side panel is already open in another tab!"
        });
    }
});

// Close side panel and reset if the tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
    if (tabId === allowedTabId) {
        allowedTabId = null;
    }
});

  
  



