const { URL } = require('url')
const { startServer } = require('@coko/server')
const { WebSocketServer } = require('ws')
const config = require('config')

const serverURL = 'http://localhost:3000'

const init = async () => {
  const { server } = await startServer()
  const wss = new WebSocketServer({ server })

  const heartbeat = wss => {
    const argumentWS = wss
    console.log('ping')
    argumentWS.isAlive = true
  }

  const clients = []

  wss.on('connection', (ws, request, client) => {
    const injectedWS = ws
    clients.push(client)
    injectedWS.isAlive = true

    const url = new URL(request.url, serverURL)

    const documentId = url.searchParams.get('documentId')

    console.log('documentId', documentId)

    injectedWS.on('pong', () => {
      heartbeat(injectedWS)
    })

    injectedWS.on('message', data => {
      const retrieved = JSON.parse(data)
      console.log(`Received message ${retrieved} from user ${client}`)
      injectedWS.send(data)
    })

    injectedWS.on('close', () => {
      console.log(`ws close ${client}`)
      clients = clients.filter(item => item !== client)
      console.log('clients', clients)
    })

    injectedWS.on('error', err => {
      console.log('error', err)
    })
  })

  const interval = setInterval(() => {
    wss.clients.forEach(client => {
      const clientArgument = client

      if (clientArgument.isAlive === false) {
        console.log('broken connection')
        return clientArgument.terminate()
      }

      clientArgument.isAlive = false
      return clientArgument.ping()
    })
  }, 5000)

  wss.on('close', () => {
    console.log('server died')
    clearInterval(interval)
  })
}

init()
