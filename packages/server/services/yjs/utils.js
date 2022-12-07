const syncProtocol = require('y-protocols/dist/sync.cjs')
const awarenessProtocol = require('y-protocols/dist/awareness.cjs')
const encoding = require('lib0/encoding')
const decoding = require('lib0/decoding')
const leveldb = require('y-leveldb')
const Y = require('yjs')
const db = require('@pubsweet/db-manager/src/db')

const persistenceDir = process.env.YPERSISTENCE || './docDir'

let persistence = null

const messageSync = 0
const messageAwareness = 1
const wsReadyStateConnecting = 0
const wsReadyStateOpen = 1
const docs = new Map()

/**
 * @param {Uint8Array} update
 * @param {any} origin
 * @param {WSSharedDoc} doc
 */
const updateHandler = (update, origin, doc) => {
  const encoder = encoding.createEncoder()
  encoding.writeVarUint(encoder, messageSync)
  syncProtocol.writeUpdate(encoder, update)
  const message = encoding.toUint8Array(encoder)
  doc.conns.forEach((_, conn) => send(doc, conn, message))
}

/**
 * @param {WSSharedDoc} doc
 * @param {any} conn
 * @param {Uint8Array} m
 */
const send = (doc, conn, m) => {
  if (
    conn.readyState !== wsReadyStateConnecting &&
    conn.readyState !== wsReadyStateOpen
  ) {
    closeConn(doc, conn)
  }

  try {
    conn.send(
      m,
      /** @param {any} err */ err => {
        err != null && closeConn(doc, conn)
      },
    )
  } catch (e) {
    closeConn(doc, conn)
  }
}

/**
 * @param {WSSharedDoc} doc
 * @param {any} conn
 */
const closeConn = (doc, conn) => {
  if (doc.conns.has(conn)) {
    /**
     * @type {Set<number>}
     */
    // @ts-ignore
    const controlledIds = doc.conns.get(conn)
    doc.conns.delete(conn)
    awarenessProtocol.removeAwarenessStates(
      doc.awareness,
      Array.from(controlledIds),
      null,
    )

    if (doc.conns.size === 0 && persistence !== null) {
      // if persisted, we store state and destroy ydocument
      persistence.writeState(doc.name, doc).then(() => {
        doc.destroy()
      })
      docs.delete(doc.name)
    }
  }

  conn.close()
}

if (typeof persistenceDir === 'string') {
  console.log(`Persisting documents to "${persistenceDir}"`)
  const LevelDbPersistence = leveldb.LeveldbPersistence
  const ldb = new LevelDbPersistence(persistenceDir)
  persistence = {
    provider: ldb,
    bindState: async (docName, ydoc) => {
      return db
        .select('docs_y_doc_state', 'docs_prosemirror_delta')
        .from('docs')
        .where('identifier', docName)
        .limit(1)
        .then(async res => {
          console.log('loaded state for ', docName)
          const delta = res[0].docs_prosemirror_delta
          const initialState = res[0].docs_y_doc_state

          if (initialState) {
            console.log('applied initial update', docName)
            Y.applyUpdate(ydoc, initialState)
          } else {
            const persistedYdoc = await ldb.getYDoc(docName)
            const newUpdates = Y.encodeStateAsUpdate(ydoc)
            ldb.storeUpdate(docName, newUpdates)
            Y.applyUpdate(ydoc, Y.encodeStateAsUpdate(persistedYdoc))
          }

          ydoc.on('update', update => {
            ldb.storeUpdate(docName, update)
          })
        })
        .catch(e => {
          console.log('failed to load', docName, e)
        })
    },
    writeState: async (docName, ydoc) => {
      const state = Y.encodeStateAsUpdate(ydoc)
      const rawText = ydoc.getText('prosemirror').toString()
      const delta = ydoc.getText('prosemirror').toDelta()
      const deltaJSON = JSON.stringify(delta, null, 2)
      const timestamp = db.fn.now()

      return db
        .select('docs_y_doc_state', 'docs_prosemirror_delta')
        .from('docs')
        .where('identifier', docName)
        .limit(1)
        .then(res => {
          if (!res.length) {
            return db
              .insert({
                docs_raw_text: rawText,
                docs_prosemirror_delta: deltaJSON,
                docs_y_doc_state: state,
                identifier: docName,
              })
              .into('docs')
              .then(res => {
                console.log('Inserted', docName)
              })
              .catch(e => {
                console.log('Error to insert', docName, e)
              })
          }

          return db('docs')
            .where({ identifier: docName })
            .update({
              docs_raw_text: rawText,
              docs_prosemirror_delta: deltaJSON,
              docs_y_doc_state: state,
              updated_at: timestamp,
            })
            .then(res => {
              console.log('Updated', docName)
            })
            .catch(e => {
              console.log('Error to update', docName, e)
            })
        })
    },
  }
}

module.exports = {
  syncProtocol,
  awarenessProtocol,
  encoding,
  persistence,
  messageSync,
  wsReadyStateConnecting,
  wsReadyStateOpen,
  docs,
  updateHandler,
  decoding,
  send,
  closeConn,
  messageAwareness,
}
