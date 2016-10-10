'use babel';

import { CompositeDisposable } from 'atom';
import { stimuli } from './behavior';
import { SidePanel } from './components';
import { addStim, resetStim } from './state';

export default {
  config: {
    sideBarWidth: {
      type: 'integer',
      default: 200,
      enum: [ 100, 200, 300, 400, 500 ]
    },
    devMode: {
      type: 'boolean',
      default: false,
    }
  },

  activate (state) {

    this.state = JSON.parse(state);

    this.sidePanel = new SidePanel();

    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-score:reset'      : () => this.reset(),
      'atom-score:hide-panel' : () => this.sidePanel.hide(),
      'atom-score:show-panel' : () => this.sidePanel.show()
    }));

    stimuli.map(stim => this.subscriptions.add(
      atom.commands.add('atom-workspace', stim.id, () => this.trigger(stim))
    ));
  },

  deactivate () {
    this.subscriptions.dispose();
  },

  serialize () {
    return JSON.stringify(this.state);
  },

  trigger (stimulus) {
    this.state = addStim(this.state, stimulus);
    this.sidePanel.setState(this.state);
  },

  reset () {
    this.state = resetStim(this.state);
    this.sidePanel.setState(this.state);
  }
};
