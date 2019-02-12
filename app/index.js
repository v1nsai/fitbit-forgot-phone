import * as messaging from "messaging";
import { vibration } from "haptics";
import document from "document";

// Open the messaging socket
messaging.peerSocket.onopen = () => {
  console.log("App ready");
}
messaging.peerSocket.onerror = (err) => {
  console.log(`Connection error: ${err.code} - ${err.message}`);
}
messaging.peerSocket.onmessage = (evt) => {
  console.log(JSON.stringify(evt.data));
}

// Handle when the socket is lost
messaging.peerSocket.onclose = function() {
  console.log("Connection lost")
  setTimeout(notifyPhoneForgotten, 1000)
}

// Create the warning notification and display it
function raisePhoneForgottenNotification() {
  let myPopup = document.getElementById("my-popup");

  // Show the popup
  myPopup.style.display = "inline";

  let btnLeft = myPopup.getElementById("btnLeft");
  let btnRight = myPopup.getElementById("btnRight");

  btnLeft.onclick = function(evt) {
    console.log("LATER");
    myPopup.style.display = "none";
  }

  btnRight.onclick = function(evt) {
    console.log("START");
    myPopup.style.display = "none";
  }
}

// Raise the notification if the socket is closed
function notifyPhoneForgotten() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.CLOSED) {
    raisePhoneForgottenNotification();
  }
}
