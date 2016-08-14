'use babel';

import { createStore } from 'redux'
import { CompositeDisposable } from 'atom'
import rootReducer from './rootReducer'

import { stimuli, translateCommand } from './stimulus'
import reinforcements from './reinforcement'

import counter from './counter'
import score from './score'
import history from './history'
import last from './last'

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

    console.log(stimuli)
    for (s in stimuli) {
      this.subscriptions.add(
        atom.commands.add('atom-workspace', s, () => this.trigger(stimuli[s]))
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
    console.log(stimuli)
    this.store.dispatch(counter.actions.increment())
    this.store.dispatch(history.actions.increment(stimuli.id))
    this.store.dispatch(last.actions.set(stimuli))

    const state = this.store.getState()
    const rs = this.reinforcements.check(state)
    //.forEach(r => this.store.dispatch(r))
    //this.panel.setState(this.store.getState())
  }
}
