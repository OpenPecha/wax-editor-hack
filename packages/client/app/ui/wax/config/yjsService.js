import { Service } from 'wax-prosemirror-core'
import { yCursorPlugin, ySyncPlugin, yUndoPlugin } from 'y-prosemirror'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

class YjsService extends Service {
    name = 'YjsService'
    boot () {
        const { 
            connectionUrl,
            docIdentifier,
            cursorBuilder,
            provider: configProvider,
            ydoc: configYdoc,
        } = this.config  
        
        let provider = configProvider ? configProvider() : null
        let ydoc = configYdoc ? configYdoc() : null

        if (!configProvider || !configYdoc) {
            ydoc = new Y.Doc()
            provider = new WebsocketProvider(
                connectionUrl,
                docIdentifier,
                ydoc
            )
        }

        const type = ydoc.getXmlFragment('prosemirror')

        this.app.PmPlugins.add('ySyncPlugin', ySyncPlugin(type))

        if (cursorBuilder) {
            this.app.PmPlugins.add('yCursorPlugin', yCursorPlugin(provider.awareness, { cursorBuilder }))
        } else {
            this.app.PmPlugins.add('yCursorPlugin', yCursorPlugin(provider.awareness))
        }
        
        this.app.PmPlugins.add('yUndoPlugin', yUndoPlugin())
    }


}

export default YjsService