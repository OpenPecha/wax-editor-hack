const { WebSocketServer } = require('ws')
const map = require('lib0/map')
const queryString = require('querystring')

const { WSSharedDoc, utils } = require('../services')

const pingTimeout = 30000

const WSServer = new WebSocketServer({
  noServer: true,
  clientTracking: true,
  path: 'yjsSocket'
})

WSServer.on('connection', (injectedWS, request) => {

  // const serverUrl = 'http://localhost:3000'
  // const url = new URL(request.url, serverUrl)
  // const token = url.searchParams.get('token')

  // eslint-disable-next-line no-unsafe-optional-chaining
  const [_path, params] = request?.url?.split("?")
        const connectionParams = queryString.parse(params)
  
  //       // NOTE: connectParams are not used here but good to understand how to get
  //       // to them if you need to pass data with the connection to identify it (e.g., a userId).
  console.log(connectionParams, _path);

  injectedWS.binaryType = 'arraybuffer'
  const docName = request.url.slice('1').split('?')[0]
  const gc = true

  const doc = getYDoc(docName, gc)

  doc.conns.set(injectedWS, new Set())

  injectedWS.on('message', message =>
    messageListener(injectedWS, doc, new Uint8Array(message)),
  )

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
      const encoder1 = utils.encoding.createEncoder()
      utils.encoding.writeVarUint(encoder1, utils.messageAwareness)
      utils.encoding.writeVarUint8Array(
        encoder1,
        utils.awarenessProtocol.encodeAwarenessUpdate(
          doc.awareness,
          Array.from(awarenessStates.keys()),
        ),
      )
      utils.send(doc, injectedWS, utils.encoding.toUint8Array(encoder1))
    }
  }
})

const getYDoc = (docName, gc = true) =>
  map.setIfUndefined(utils.docs, docName, () => {
    const doc = new WSSharedDoc(docName)
    doc.gc = gc

    if (utils.persistence !== null) {
      utils.persistence.bindState(docName, doc)
    }

    utils.docs.set(docName, doc)
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


module.exports = WSServer