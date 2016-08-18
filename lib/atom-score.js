'use babel'

import { CompositeDisposable } from 'atom'

import { createStore } from 'redux'

import rootReducer from './rootReducer'

import { score, history, counter, last } from './state'

import { stimuli, reinforcements } from './behavior'

import { Panel, SidePanel } from './components'

import Immutable from 'immutable'

export default {

  activate (state) {

    state.history = Immutable.Map(state.history)

    this.store = createStore(rootReducer, state)

    this.reinforcements = new reinforcements()
    this.panel          = new Panel()
    this.sidePanel      = new SidePanel()
    this.panel.setState(state)

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
    const state = this.store.getState()
    return {
      score: state.score,
      count: state.count,
      history: state.history.toJS()
    }
  },

  trigger (stimulus) {

    this.store.dispatch(last.actions.set(stimulus))
    this.store.dispatch(history.actions.increment(stimulus))
    this.store.dispatch(score.actions.subtract(1))
    this.store.dispatch(counter.actions.increment(1))

    this.panel.setState(this.store.getState())
    this.sidePanel.setState(this.store.getState())

  },

  reset () {
    return
  }
}
