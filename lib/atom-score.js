'use babel';

import { createStore } from 'redux'
import { CompositeDisposable } from 'atom'
import rootReducer from './rootReducer'

import { stimuli, translateCommand } from './stimulus'
import reinforcements from './reinforcement'

import panel from './panel'

export default {

  activate (state) {
    this.store = createStore(rootReducer)

    this.reinforcements = new reinforcements()
    this.panel          = new panel()

    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-score:reset'      : () => this.reset(),
      // 'atom-score:hide-panel' : () => this.panel.hide(),
      // 'atom-score:show-panel' : () => this.panel.show()
    }));

    for (s in stimuli) {
      var com = translateCommand(s)
      atom.commands.add(
        'atom-workspace',
        s,
        () => this.trigger(com)
      )
    }
  },

  deactivate () {
    // TODO: do I need to destroy the store?
    this.subscriptions.dispose()
  },

  serialize () {
    return this.store.getState()
  },

  trigger (stimuli) {
    const state = this.store.getState()
    console.log(state)
    const rs = this.reinforcements.check(state)
    console.log(rs)
    //.forEach(r => this.store.dispatch(r))
    //this.panel.setState(this.store.getState())
  }
}
