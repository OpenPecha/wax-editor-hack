import { Service } from "wax-prosemirror-core" 
import { WaxContext } from 'wax-prosemirror-core'

let scrollPos = 0

export default class DummyService extends Service {
  name = 'DummyService'
  boot() {
    // console.log(this.app?.context?.pmViews.main);
    // console.log(this)
    setInterval(() => {
        let conf = this.app.config.get('config.DummyService')
        scrollPos = this.app.context.pmViews.main.state.selection.from
        console.log('DummyService', this.app.context.pmViews.main.state.selection.from)
        
        if(!conf.primary) {
            console.log('NOT primary');
            console.log(this.app.context.pmViews.main);
            // this.app.context.pmViews.main.state.selection.from = scrollPos
            // this.app.context.pmViews.main.setSelection(scrollPos).scrollIntoView()
        }
    }, 2000)
}
  register() {
  }
}
