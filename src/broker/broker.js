const aedes = require('aedes')()
const httpServer = require('http').createServer()
const server = require('net').createServer(aedes.handle)
const ws = require('websocket-stream')
const port_mqtt = 1882
const port_ws = 8888

ws.createServer({ server: httpServer }, aedes.handle)

httpServer.listen(port_ws, function () {
  console.log('websocket server listening on port ', port_ws)
})

server.listen(port_mqtt, function () {
  console.log('server started and listening on port ', port_mqtt)
})

aedes.subscribe("toggle_pompa", (packet, cb) => {
  console.log(`onMessageArrived: ${packet.payload.toString()}`);
  cb();
});