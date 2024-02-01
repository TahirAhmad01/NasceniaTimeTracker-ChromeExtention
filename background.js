// Background script to handle messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "calculateAttendanceTime") {
    // Display the result in a notification
    chrome.action.setBadgeText({
      text: message.result,
    });
  }
});
