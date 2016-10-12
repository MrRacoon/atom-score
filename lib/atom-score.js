'use babel';

import { CompositeDisposable } from 'atom';
import { merge } from 'ramda';
import { lookupStimulus, stimConfig} from './behavior';
import { SidePanel } from './components';
import { addStim, resetStim } from './state';

export default {
  config: merge({
    sideBarWidth: {
      type: 'integer',
      default: 200,
      minimum: 0,
      maximum: 800
    },
    devMode: {
      type: 'boolean',
      description: 'all atom commands are counted, as zero/nil points',
      default: false,
    }
  }, stimConfig),

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
      }
    }
  },

  reset () {
    this.dispatch(resetStim);
  }
};
