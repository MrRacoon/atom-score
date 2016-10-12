'use babel';

import { CompositeDisposable } from 'atom';
import { lookupStimulus, defaultStimulus } from './behavior';
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
      description: 'all atom commands are counted, as zero/nil points',
      default: false,
    }
  },

  activate (state) {
    this.state = JSON.parse(state);

    this.sidePanel = new SidePanel();
    this.sidePanel.setState(this.state);
    // I need this to make the side-panel
    // graphs render on load. why though?
    this.sidePanel.setState(this.state);

    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-score:reset'      : () => this.reset(),
      'atom-score:hide-panel' : () => this.sidePanel.hide(),
      'atom-score:show-panel' : () => this.sidePanel.show()
    }));
    //stimuli.map(stim => this.subscriptions.add(
      // atom.commands.add('atom-workspace', stim.id, () => this.trigger(stim))
    //));
    this.subscriptions.add(
      atom.commands.onDidDispatch((e) => {
        this.trigger(e.type);
      })
    );
  },

  deactivate () {
    this.subscriptions.dispose();
  },

  serialize () {
    return JSON.stringify(this.state);
  },

  dispatch(fn) {
    this.state = fn(this.state);
    this.sidePanel.setState(this.state);
  },

  trigger (type) {
    if (type) {
      let stim = lookupStimulus(type);
      if (stim) {
        this.dispatch(addStim(stim));
      } else if (!stim && atom.config.get('atom-score.devMode')) {
        stim = defaultStimulus(type);
        this.dispatch(addStim(stim));
      }
    }
  },

  reset () {
    this.dispatch(resetStim);
  }
};
