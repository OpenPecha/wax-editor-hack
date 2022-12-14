import { Service } from 'wax-prosemirror-core'
import { yCursorPlugin, ySyncPlugin, yUndoPlugin } from 'y-prosemirror'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

class YjsService extends Service {
    name = 'YjsService'
    boot () {
        const { connectionUrl, docIdentifier } = this.config   
        const ydoc = new Y.Doc();

        const provider = new WebsocketProvider(
            connectionUrl,
            docIdentifier,
            ydoc
        );

    const type = ydoc.getXmlFragment('prosemirror')

    this.app.PmPlugins.add('ySyncPlugin', ySyncPlugin(type))
    this.app.PmPlugins.add('yCursorPlugin', yCursorPlugin(provider.awareness))
    this.app.PmPlugins.add('yUndoPlugin', yUndoPlugin())
  }
}

export default YjsService
