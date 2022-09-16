"use strict";
const e = "student_not_found",
  n = "duplicate_student";
function o(o) {
  if (
    (chrome.runtime.lastError &&
      console.log(
        "Error while sending message=" + chrome.runtime.lastError.message
      ),
    !o)
  )
    return void window.close();
  const t = document.getElementById("tpMsgBlocked");
  switch (o.reason) {
    case e:
      t.innerHTML =
        "The Securly Classroom extension cannot connect because the user logged into this browser profile is not listed in any class roster for the organization.  Once the student is listed in at least one class you can retry by clicking the extension icon. When successful, the warning symbol on the extension will be removed.";
      break;
    case n:
      t.innerHTML =
        "The Securly Classroom extension cannot connect because the student logged into this browser profile was found in more than one organization in Securly Classroom.  The student can only belong to one organization to participate in class sessions on Mac or Windows devices.";
      break;
    default:
      t.innerHTML =
        "The Securly Classroom extension cannot connect because this Chromebook is not in the device list in Securly Classroom. Once the device is properly shown in the database you can retry by clicking the extension icon. When successful, the warning symbol on the extension will be removed.";
  }
}
window.addEventListener("load", function () {
  document.getElementById("tpMsgBlocked");
  chrome.runtime.sendMessage({ action: "notfound" }, o);
});
