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

// When the socket is lost, wait 10 seconds, check if socket is still lost, then raise the alert
messaging.peerSocket.onclose = function() {
  console.log("Connection lost")
  setTimeout(notifyPhoneForgotten, 10000)
}

// Raise the notification if the socket is still closed
function notifyPhoneForgotten() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.CLOSED) {
    console.log("notifyPhoneForgotten")
    let notifyPopup = document.getElementById("forgot-notification-window");

    // Show the popup
    notifyPopup.style.display = "inline";
    
    // Vibrate the watch
    vibration.start("ring");

    // Create the acknowledge button and handle what happens when the button is clicked
    let acknowledge = notifyPopup.getElementById("acknowledge");

    acknowledge.onclick = function(evt) {
      console.log("Acknowledge clicked");
      vibration.stop();
      notifyPopup.style.display = "none";
    }
  }
}
