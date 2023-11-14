/* eslint-disable react/prop-types */

import React, { useState } from 'react'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

const YjsContext = React.createContext({})

const { Provider, Consumer } = YjsContext

const { CLIENT_WEBSOCKET_URL } = process.env;

const withYjs = Component => {
  const C = props => (
    <Consumer>
      {(providerProps) => <Component {...providerProps} {...props} />}
    </Consumer>
  )

  return C
}

const YjsProvider = ({ children }) => {
    const [yjsProvider, setYjsProvider] = useState(null)
    const [ydoc, setYDoc] = useState(null)
    const [sharedUsers, setSharedUsers] = useState([])

    let currentUser = null

    if (localStorage.getItem('YjsCurrentUser')) {
      currentUser = JSON.parse(localStorage.getItem('YjsCurrentUser'))
    }

    const createYjsProvider = (docIdentifier) => {
      let identifier = docIdentifier
      let ydocInstance = null

      if (ydoc) {
        ydocInstance = ydoc
      } else {
        ydocInstance = new Y.Doc()
        setYDoc(ydocInstance)
      }
    
      if (!identifier) {
        identifier = Array.from(Array(20), () => Math.floor(Math.random() * 36).toString(36)).join('');
        // eslint-disable-next-line no-restricted-globals
        window.history.replaceState( {} , identifier, `/${identifier}` );
      }

      // eslint-disable-next-line no-restricted-globals
      const provider = new WebsocketProvider(CLIENT_WEBSOCKET_URL, identifier, ydocInstance)

      provider.awareness.on('change', () => {
        setSharedUsers([...provider.awareness.getStates()])
      })


      if (currentUser) {
        provider.awareness.setLocalStateField('user', currentUser)
      } else {
        const arrayColor = ['#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8']

        const color = arrayColor[(Math.floor(Math.random() * arrayColor.length))]
  
        provider.awareness.setLocalStateField('user', { id: provider.awareness.clientID, color, name: 'Anonymous' })

        localStorage.setItem('YjsCurrentUser', JSON.stringify(provider.awareness.getLocalState().user))
      }



      setYjsProvider(provider)
    }

    const updateLocalUser = (user) => {
      localStorage.setItem('YjsCurrentUser', JSON.stringify({ ...user, id: yjsProvider.awareness.clientID }))
      yjsProvider.awareness.setLocalStateField('user', { ...user, id: yjsProvider.awareness.clientID })
    }

    return (
        <Provider value={{ yjsProvider, ydoc, sharedUsers, currentUser, createYjsProvider, updateLocalUser }}>
            {children}  
        </Provider>

    )
  }
  

export {
  Consumer as YjsConsumer,
  YjsProvider,
  withYjs,
}

export default YjsContext
