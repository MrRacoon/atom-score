'use babel'

import { CompositeDisposable } from 'atom'

import { createStore } from 'redux'

import { rootReducer, score, history } from './state'

import { stimuli, reinforcements } from './behavior'

import { Panel } from './components'

export default {

  activate () {
    this.store = createStore(rootReducer)

    this.reinforcements = new reinforcements()
    this.panel          = new Panel()

    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-score:reset'      : () => this.reset(),
      'atom-score:hide-panel' : () => this.panel.hide(),
      'atom-score:show-panel' : () => this.panel.show()
    }))

    stimuli.map(stim => this.subscriptions.add(
      atom.commands.add('atom-workspace', stim.id, () => this.trigger(stim))
    ))

  },

  deactivate () {
    // TODO: do I need to destroy the store?
    this.subscriptions.dispose()
  },

  serialize () {
    return this.store.getState()
  },

  trigger (stimulus) {

    this.store.dispatch(history.actions.increment(stimulus))
    this.store.dispatch(score.actions.subtract(1))

    this.panel.setState(this.store.getState())

    console.log(this.store.getState())

  }
}
