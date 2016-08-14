'use babel'

import { CompositeDisposable } from 'atom'

import { createStore } from 'redux'
import rootReducer from './rootReducer'

import counter from './counter'
import score from './score'
import history from './history'
import last from './last'
import recent from './recent'

import stimuli from './stimulus'
import reinforcements from './reinforcement'

import { Panel } from './components'

export default {

  activate (state) {
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

  trigger (stimuli) {

    this.store.dispatch(score.actions.add())
    this.store.dispatch(counter.actions.increment())
    this.store.dispatch(history.actions.increment(stimuli))
    this.store.dispatch(last.actions.set(stimuli))
    this.store.dispatch(recent.actions.add(stimuli))

    const state = this.store.getState()
    const rs = this.reinforcements.check(state)

    console.log(state)

    this.panel.setState(state)

  }
}
