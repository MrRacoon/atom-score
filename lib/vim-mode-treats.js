'use babel';

import VimModeTreatsToolbar from './vim-mode-treats-toolbar';
import { CompositeDisposable } from 'atom';

export default {

  vimModeTreatsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.vimModeTreatsView = new VimModeTreatsView(state.vimModeTreatsViewState);
    this.vimModeTreatstoolbar = new VimModeTreatsToolbar(state.vimModeTreatsToolbarState)
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.vimModeTreatsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vim-mode-treats:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.vimModeTreatsView.destroy();
    this.vimModeTreatstoolbar.destroy();
  },

  serialize() {
    return {
      vimModeTreatsViewState: this.vimModeTreatsView.serialize()
    };
  },

  consumeStatusBar(statusBar) {
    this.vimModeTreatsToolbar.addTile(statusBar)
  },

  toggle() {
    console.log('VimModeTreats was toggled!');
    this.vimModegTreatsToolbar.toggle()
  }

};
