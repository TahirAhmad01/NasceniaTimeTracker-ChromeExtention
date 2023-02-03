// Listen for messages from content script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "getShowAttendanceTime") {
    // Respond with the current state of showAttendanceTime
    sendResponse({
      showAttendanceTime: localStorage.getItem("showAttendanceTime") === "true",
    });
  } else if (message.type === "updateShowAttendanceTime") {
    // Update the state of showAttendanceTime
    localStorage.setItem("showAttendanceTime", message.showAttendanceTime);
    // Send a message to all tabs to update their attendance time display
    chrome.tabs.query({}, function (tabs) {
      for (let tab of tabs) {
        chrome.tabs.sendMessage(tab.id, {
          type: "updateShowAttendanceTime",
          showAttendanceTime: message.showAttendanceTime,
        });
      }
    });
  }
});
