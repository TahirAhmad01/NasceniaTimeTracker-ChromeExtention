function calculateAttendanceTime(callback) {
  try {
    const alertInfo = document.querySelector(".alert.alert-info");
    if (alertInfo) {
      const timeString = alertInfo.querySelector("b").innerText.trim();
      const [hours, minutes, period] = timeString.split(/:| /);
      let hours24 = parseInt(hours, 10);
      if (period === "PM") {
        hours24 += 12;
      }
      const minutes24 = parseInt(minutes, 10);
      const attendanceTime = new Date();
      attendanceTime.setHours(hours24, minutes24, 0, 0);

      const currentTime = new Date();
      const differenceMilliseconds = currentTime - attendanceTime;

      const differenceHours = Math.floor(
        differenceMilliseconds / (1000 * 60 * 60)
      );
      const differenceMinutes = Math.floor(
        (differenceMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
      );

      const formattedDifference = `${differenceHours} hours ${differenceMinutes} minutes`;
      console.log("Attendance Time Difference:", formattedDifference);

      // Call the callback function with the result
      callback(null, formattedDifference);
    } else {
      console.log("Alert info not found.");
      // Call the callback function with an error message
      callback("Attendance time not found.", null);
    }
  } catch (error) {
    console.error("Error calculating attendance time:", error);
    // Call the callback function with the error
    callback(error.message || "Error calculating attendance time.", null);
  }
}

// Call calculateAttendanceTime with a callback
calculateAttendanceTime((error, result) => {
  if (error) {
    console.error(error);
    // Handle error
  } else {
    console.log(result);
    // Send message to the background script
    chrome.runtime.sendMessage({ action: "calculateAttendanceTime", result: result });
  }
});
