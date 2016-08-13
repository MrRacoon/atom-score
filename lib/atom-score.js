'use babel';

import { createStore } from 'redux'
import { CompositeDisposable } from 'atom'
import rootReducer from './rootReducer'
import achievements from './achievements'

// TODO: change the name of atom-score-rules
import { commands } from './commands'

export default {

  activate (state) {
    this.store = createStore(rootReducer, state)
    this.achievements = new achievements()

    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-score:reset'      : () => this.reset(),
      'atom-score:hide-panel' : () => this.panel.hide(),
      'atom-score:show-panel' : () => this.panel.show()
    }));

    commands.forEach(com => {
      atom.commands.add('atom-workspace', com.command, () => com.trigger(rule.timeStamped()))
    })
  },

  deactivate () {
    // TODO: do I need to destroy the store?
    this.subscriptions.dispose()
  },

  serialize () {
    return this.store.getState()
  },

  trigger (event) {
    // this.event.actions.forEach(a => this.store.dispatch(a))
    const state = this.store.getState()
    const achs  = this.achievements.check(state)
    console.log(achs)
    // this.achievements.check(state).forEach(a => this.store.dispatch(a))
    // this.panel.setScore(state)
  }

}
