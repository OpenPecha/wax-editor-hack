const { startServer } = require('@coko/server')
const { WebSocket, WebSocketServer } = require('ws')
const map = require('lib0/map')
const { WSSharedDoc, utils } = require('./services/index')

const docs = new Map()
const pingTimeout = 30000

const init = async () => {
  try {
    const clients = []
    const server = await startServer()
    const wss = new WebSocketServer({ server })
    wss.on('connection', (ws, request) => {
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          clients.push(client)
        }
      })
      const injectedWS = ws
      const docName = request.url.slice('1').split('?')[0]
      const gc = true
      const doc = getYDoc(docName, gc)
      doc.conns.set(injectedWS, new Set())
      injectedWS.isAlive = true
      let pingReceived = true

      const pingInterval = setInterval(() => {
        if (!pingReceived) {
          if (doc.conns.has(injectedWS)) {
            utils.closeConn(doc, injectedWS)
          }

          clearInterval(pingInterval)
        } else if (doc.conns.has(injectedWS)) {
          pingReceived = false

          try {
            injectedWS.ping()
          } catch (error) {
            utils.closeConn(doc, injectedWS)
            clearInterval(pingInterval)
          }
        }
      }, pingTimeout)

      injectedWS.on('message', message =>
        messageListener(injectedWS, doc, new Uint8Array(message)),
      )

      injectedWS.on('close', () => {
        utils.closeConn(doc, injectedWS)
        clearInterval(pingInterval)
      })

      injectedWS.on('ping', () => {
        pingReceived = true
      })

      {
        const encoder = utils.encoding.createEncoder()
        utils.encoding.writeVarUint(encoder, utils.messageSync)
        utils.syncProtocol.writeSyncStep1(encoder, doc)
        utils.send(doc, injectedWS, utils.encoding.toUint8Array(encoder))
        const awarenessStates = doc.awareness.getStates()

        if (awarenessStates.size > 0) {
          utils.encoding.writeVarUint(encoder, utils.messageAwareness)
          utils.encoding.writeVarUint8Array(
            encoder,
            utils.awarenessProtocol.encodeAwarenessUpdate(
              doc.awareness,
              Array.from(awarenessStates.keys()),
            ),
          )
          utils.send(doc, injectedWS, utils.encoding.toUint8Array(encoder))
        }
      }
    })

    const getYDoc = (docName, gc = true) =>
      map.setIfUndefined(docs, docName, () => {
        const doc = new WSSharedDoc(docName)
        doc.gc = gc

        if (utils.persistence !== null) {
          utils.persistence.bindState(docName, doc)
        }

        docs.set(docName, doc)
        return doc
      })

    const messageListener = (conn, doc, message) => {
      try {
        const encoder = utils.encoding.createEncoder()
        const decoder = utils.decoding.createDecoder(message)
        const messageType = utils.decoding.readVarUint(decoder)

        // eslint-disable-next-line default-case
        switch (messageType) {
          case utils.messageSync:
            utils.encoding.writeVarUint(encoder, utils.messageSync)
            utils.syncProtocol.readSyncMessage(decoder, encoder, doc, null)

            if (utils.encoding.length(encoder) > 1) {
              utils.send(doc, conn, utils.encoding.toUint8Array(encoder))
            }

            break
          case utils.messageAwareness:
            utils.awarenessProtocol.applyAwarenessUpdate(
              doc.awareness,
              utils.decoding.readVarUint8Array(decoder),
              conn,
            )
            break
        }
      } catch (error) {
        console.error(error)
        doc.emit('error', [error])
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}

init()
