const { URL } = require('url')
const { startServer } = require('@coko/server')
const config = require('config')

const serverURL = config.has('pubsweet-server.publicURL')
  ? config.get('pubsweet-server.publicURL')
  : config.get('pubsweet-server.baseURL')

const init = async () => {
  const { createdWS } = await startServer()

  const heartbeat = ws => {
    const argumentWS = ws
    console.log('ping')
    argumentWS.isAlive = true
  }

  const clients = []

  createdWS.yjs.on('connection', (ws, request, client) => {
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
    createdWS.yjs.clients.forEach(client => {
      const clientArgument = client

      if (clientArgument.isAlive === false) {
        console.log('broken connection')
        return clientArgument.terminate()
      }

      clientArgument.isAlive = false
      return clientArgument.ping()
    })
  }, 5000)

  createdWS.yjs.on('close', () => {
    console.log('server died')
    clearInterval(interval)
  })
}

init()
