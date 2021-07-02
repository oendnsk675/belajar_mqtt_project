
let hostname = "localhost";
let port = 8888;
let clientId = "cozy";

let log_area = document.getElementById("log");
let btn_publish = document.getElementById("btn-publish");

btn_publish.addEventListener('click', ()=>{
    onPub();
});

// Create a client instance
var client = new Messaging.Client(hostname, port, clientId);

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
//   console.log("connected");
    log_area.value += "connected\n";
    client.subscribe("ketinggian_air");
}

function onPub(){
    message = new Messaging.Message("pompa menyala");
    message.destinationName = "toggle_pompa";
    client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
    log_area.value += `onMessageArrived: ${message.payloadString}\n`;
    // console.log("onMessageArrived:"+message.payloadString);
}
