'use babel';

import AtomScoreToolbar from './atom-score-toolbar';
import AtomScoreBoard from './atom-score-board';
import { rules } from './atom-score-rules';
import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state = {}) {

    // Initialize the state
    this.state = state

    // Create the toolbar icon
    this.toolbar = new AtomScoreToolbar(this.state.toolbar)

    // Create the toolbar icon
    this.scoreboard = new AtomScoreBoard(this.state.scoreboard)

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-score:toggle': () => this.toggle(),
      'atom-score:reset': () => this.reset()
    }));

    rules.forEach(rule => {
      atom.commands.add('atom-workspace', rule.command, () => this.trigger(rule))
    })

  },

  trigger (entry) {
    const now = new Date()
    entry.time = now
    this.scoreboard.addEntry(entry)
    this.toolbar.setScore(this.scoreboard.all())
  },

  deactivate() {
    this.toolbar.destroy();
    this.modalPanel.destroy();
    this.subscriptions.dispose();
  },

  serialize() {
    return {
      toolbar: this.toolbar.serialize(),
      scoreboard: this.scoreboard.serialize()
    }
  },

  consumeStatusBar(statusBar) {
    this.toolbar.addTile(statusBar)
  },

  toggle() {
    this.toolbar.toggle()
  },

  reset() {
    this.scoreboard.reset()
  }

};
