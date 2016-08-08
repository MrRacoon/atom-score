'use babel';

import AtomScoreToolbar from './atom-score-toolbar';
import AtomScoreBoard from './atom-score-board';
import AtomScoreNotifier from './atom-score-notifier';
import AtomScoreAchievements from './atom-score-achievements';
import AtomScoreStatPanel from './atom-score-stat-panel';
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

    this.achievements = new AtomScoreAchievements()

    this.panel = new AtomScoreStatPanel(this.state.panel)

    // Create the notifier
    this.notifier = new AtomScoreNotifier()
    this.notifier.register(atom.notifications)

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-score:toggle': () => this.toggle(),
      'atom-score:reset': () => this.reset(),
      'atom-score:hide-panel': () => this.panel.hide(),
      'atom-score:show-panel': () => this.panel.show()
    }));

    rules.forEach(rule => {
      atom.commands.add('atom-workspace', rule.command, () => this.trigger(rule))
    })

  },

  trigger (entry) {

    entry.resetTime()

    this.scoreboard.addEntry(entry)
    const currentScore = this.scoreboard.all()

    this.toolbar.setScore(currentScore)
    this.panel.setScore(currentScore)

    this.achievements
      .check(currentScore)
      .forEach(ach => this.notifier.achievement(ach))
  },

  deactivate() {
    this.toolbar.destroy();
    this.modalPanel.destroy();
    this.panel.destroy();

    this.subscriptions.dispose();
  },

  serialize() {
    return {
      toolbar: this.toolbar.serialize(),
      scoreboard: this.scoreboard.serialize(),
      panel: this.panel.serialize()
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
    const currentScore = this.scoreboard.all()
    this.toolbar.setScore(currentScore)
    this.panel.setScore(currentScore)
  }

};
