const { app: configureApp } = require('@coko/server')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { execute, subscribe } = require('graphql')

const url = require("url")
const config = require('config')
const graphqlSchema = require('pubsweet-server/src/graphql/schema')
const { token } = require('pubsweet-server/src/authentication')
const connectors = require('pubsweet-server/src/connectors')
const helpers = require('pubsweet-server/src/helpers/authorization')

const map = require('lib0/map')
const queryString = require('querystring')

const { WSSharedDoc, utils } = require('../services')

const pingTimeout = 30000


const configuredApp = (app) => {

    const confApp = configureApp(app)

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

    let useGraphQLServer = true

    if (
        config.has('pubsweet-server.useGraphQLServer') &&
        config.get('pubsweet-server.useGraphQLServer') === false
    ) {
        useGraphQLServer = false
    }

    let useJobQueue = true

    if (
        config.has('pubsweet-server.useJobQueue') &&
        config.get('pubsweet-server.useJobQueue') === false
    ) {
        useJobQueue = false
    }

    confApp.onListen = async (server) => {

        if (useGraphQLServer) {
            // const {
            //     addSubscriptions,
            // // eslint-disable-next-line global-require
            // } = require('pubsweet-server/src/graphql/subscriptions')
            
            // addSubscriptions(httpServer) // Add GraphQL subscriptions


            SubscriptionServer.create(
            {
                schema: graphqlSchema,
                execute,
                subscribe,
                onConnect: (connectionParams, injectedWS, context) => {

                    console.log({connectionParams})
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


                    if (!connectionParams.authToken) {
                        throw new Error('Missing auth token')
                    }

                    return new Promise((resolve, reject) => {
                        token.verify(connectionParams.authToken, (_, id) => {
                        if (!id) {
                            // logger.info('Bad auth token')
                            reject(new Error('Bad auth token'))
                        }

                        resolve({ user: id, connectors, helpers })
                        })
                    })
                },
            },
            {
                server,
                path: '/subscriptions',
            },
            )
        }
      
        if (useJobQueue) {
            // eslint-disable-next-line global-require
            const { startJobQueue } = require('pubsweet-server/src/jobs')
            await startJobQueue() // Manage job queue
        }
      
        if (config.has('pubsweet-server.cron.path')) {
            /* eslint-disable-next-line import/no-dynamic-require, global-require */
            require(config.get('pubsweet-server.cron.path'))
        }
    }

    return confApp
}

module.exports = configuredApp