import * as messaging from "messaging";

messaging.peerSocket.onopen = () => {
  console.log("Companion ready");
}

messaging.peerSocket.onerror = (err) => {
  console.log(`Connection error: ${err.code} - ${err.message}`);
}

messaging.peerSocket.onmessage = (evt) => {
  console.log(JSON.stringify(evt.data));
}
