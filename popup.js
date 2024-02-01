document.addEventListener("DOMContentLoaded", function () {
  chrome.runtime.sendMessage({ action: "calculateAttendanceTime" });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "calculateAttendanceTime") {
    document.getElementById("result").innerText = message.result;
  }
});
