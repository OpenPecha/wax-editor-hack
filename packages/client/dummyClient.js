// placeholder
const WebSocket = require('ws')

const ws = new WebSocket(
  'ws://localhost:4000/yjs?token=123&documentId=lkajsd234dsfa',
)

function heartbeat() {
  clearTimeout(this.pingTimeout)
  // Use `WebSocket#terminate()`, which immediately destroys the connection,
  // instead of `WebSocket#close()`, which waits for the close timer.
  // Delay should be equal to the interval at which your server
  // sends out pings plus a conservative assumption of the latency.
  this.pingTimeout = setTimeout(() => {
    this.terminate()
  }, 5000 + 1000)
}

// ws.on('open', function open() {
//   ws.send(JSON.stringify({ hello: 'test' }))
//   heartbeat()
// })
ws.on('open', heartbeat)
ws.on('ping', heartbeat)
// ws.on('pong', heartbeat)
ws.on('message', data => {
  const retrieved = JSON.parse(data)
})

ws.on('close', function message() {
  clearTimeout(this.pingTimeout)
})
