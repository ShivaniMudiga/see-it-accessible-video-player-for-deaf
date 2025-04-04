console.log("🚀 Service worker is active!");

let allowedTabId = null;

// ✅ Inject content script safely on YouTube page load
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    try {
        console.log("🔄 Tab Updated:", { tabId, changeInfo, tab });

        // Safe check for tab.url before using .includes
        if (
            changeInfo.status === "complete" &&
            tab &&
            typeof tab.url === "string" &&
            tab.url.includes("youtube.com")
        ) {
            chrome.scripting.executeScript({
                target: { tabId },
                files: ["content-script.js"]
            }).catch((err) =>
                console.warn("⚠️ Script injection failed:", err)
            );
        }
    } catch (err) {
        console.error("🚨 Error in tabs.onUpdated:", err);
    }
});

// ✅ Relay message from content script to side panel (if used)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    try {
        if (message.status) {
            chrome.runtime.sendMessage(message);
        }
    } catch (err) {
        console.error("📩 Error relaying message:", err);
    }
});

// ✅ Handle extension icon click (for side panel)
chrome.action.onClicked.addListener(async (tab) => {
    try {
        if (allowedTabId === null) {
            allowedTabId = tab.id;
            await chrome.sidePanel.open({ tabId: tab.id });
        } else if (allowedTabId === tab.id) {
            await chrome.sidePanel.open({ tabId: tab.id });
        } else {
            console.warn("🚫 Side panel already open in tab:", allowedTabId);
            chrome.notifications.create({
                type: "basic",
                iconUrl: "icon.png",
                title: "Side Panel Restricted",
                message: "Side panel is already open in another tab!"
            });
        }
    } catch (err) {
        console.error("💥 Error opening side panel:", err);
    }
});

// ✅ Reset when tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
    if (tabId === allowedTabId) {
        allowedTabId = null;
    }
});
