'use babel';

import AtomScoreBoard from './atom-score-board'
import AtomScoreStatPanel from './atom-score-stat-panel'
import { rules } from './atom-score-rules'
import { CompositeDisposable } from 'atom'

export default {

  subscriptions: null,

  activate(state = {}) {

    this.scoreboard    = new AtomScoreBoard(state.scoreboard)
    this.panel         = new AtomScoreStatPanel(state.panel)
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-score:reset'      : () => this.reset(),
      'atom-score:hide-panel' : () => this.panel.hide(),
      'atom-score:show-panel' : () => this.panel.show()
    }));

    rules.forEach(rule => {
      atom.commands.add('atom-workspace', rule.command, () => this.trigger(rule.timeStamped()))
    })

    return this

  },

  serialize() {
    return {
      scoreboard: this.scoreboard.serialize(),
      panel: this.panel.serialize()
    }
  },

  deactivate() {
    this.scoreboard.destroy()
    this.panel.destroy()
    this.subscriptions.dispose()
  },

  trigger (event) {
    this.scoreboard.addEvent(event)
    this.panel.setScore(this.scoreboard.current())
  },

  reset() {
    this.scoreboard.reset()
    this.panel.setScore(this.scoreboard.current())
  }

};
