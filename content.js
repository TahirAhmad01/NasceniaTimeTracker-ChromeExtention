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

      callback(null, formattedDifference);
    } else {
      callback("Attendance time not found.", null);
    }
  } catch (error) {
    console.error("Error calculating attendance time:", error);
    callback(error.message || "Error calculating attendance time.", null);
  }
}

function updateAttendanceTimeOnPage(attendanceTime) {
  const div = document.createElement("div");
  div.textContent = "Attendance Time Difference: " + attendanceTime;
  div.style.padding = "10px";
  div.style.backgroundColor = "#f0f0f0";
  div.style.marginTop = "-10px";
  div.style.marginBottom = "15px";
  div.style.borderRadius = "5px";
  div.style.border = "1px solid #ddd";

  const alertInfo = document.querySelector(".alert.alert-info");
  if (alertInfo) {
   
    const newDiv = document.createElement("div");
    alertInfo.insertAdjacentElement("afterend", newDiv);
    newDiv.insertAdjacentElement("afterend", div);
  }
}


calculateAttendanceTime((error, result) => {
  if (error) {
    console.error(error);
  } else {
    console.log(result);
    updateAttendanceTimeOnPage(result);
  }
});