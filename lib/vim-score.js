'use babel';

import VimScoreToolbar from './vim-score-toolbar';
import VimScoreBoard from './vim-score-board';
import { events } from './vim-score-events';
import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state = {}) {

    // Initialize the state
    this.state = state

    // Create the toolbar icon
    this.toolbar = new VimScoreToolbar(this.state.toolbar)

    // Create the toolbar icon
    this.scoreboard = new VimScoreBoard(this.state.scoreboard)

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vim-score:toggle': () => this.toggle(),
      'vim-score:reset': () => this.reset()
    }));

    events.forEach(entry => {
      atom.commands.add('atom-workspace', entry.command, () => this.trigger(entry))
    })

  },

  trigger (entry) {
    this.scoreboard.addPoints(entry.points)
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
