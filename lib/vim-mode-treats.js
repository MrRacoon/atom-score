'use babel';

import VimModeTreatsToolbar from './vim-mode-treats-toolbar';
import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state = {}) {

    // Initialize the state
    this.state = state

    // Create the toolbar icon
    this.toolbar = new VimModeTreatsToolbar(this.state.toolbar)

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vim-mode-treats:toggle': () => this.toggle()
    }));

  },

  deactivate() {
    this.toolbar.destroy();
    this.modalPanel.destroy();
    this.subscriptions.dispose();
  },

  serialize() {
    return {
      toolbar: this.toolbar.serialize()
    }
  },

  consumeStatusBar(statusBar) {
    this.toolbar.addTile(statusBar)
  },

  toggle() {
    console.log('vim-mode-treats was toggled!');
    this.toolbar.toggle()
  }

};
