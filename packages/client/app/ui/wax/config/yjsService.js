import { Service } from 'wax-prosemirror-core'
import { yCursorPlugin, ySyncPlugin, yUndoPlugin } from 'y-prosemirror'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

class YjsService extends Service {
    name = 'YjsService'
    boot () {
        const { connectionUrl, docIdentifier, cursorBuilder } = this.config  
        
        let provider = null
        let ydoc = null

        if (this.config.provider) {
            provider = this.config.provider()
            ydoc = this.config.ydoc()
        } else {
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