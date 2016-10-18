'use babel';

import { CompositeDisposable } from 'atom';
import { merge } from 'ramda';
import { lookupStimulus, stimConfig} from './behavior';
import { SidePanel, Panel } from './components';
import { addStim, reset } from './state';

export default {
  config: merge({
    sideBarWidth: {
      type: 'integer',
      default: 200,
      minimum: 0,
      maximum: 800
    },
    consecutiveCommands: {
      type: 'boolean',
      description: 'count conecutive commands',
      default: false,
    },
    devMode: {
      type: 'boolean',
      description: 'all atom commands are counted, as zero/nil points',
      default: false,
    },
    seed: {
      type: 'integer',
      description: 'use a different seed for random generation',
      default: 1,
    },
  }, stimConfig),

  activate (state) {

    this.panel         = new Panel();
    this.sidePanel     = new SidePanel();
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'atom-score:reset' : () => this.reset(),
        'atom-score:hide-panel' : () => this.sidePanel.hide(),
        'atom-score:show-panel' : () => this.sidePanel.show(),
        'atom-score:save' : () => this.save(),
        'atom-score:revert' : () => this.revert(),
        'atom-score:display-points' : () => this.sidePanel.showGraph(this.state),
        'atom-score:display-items' : () => this.sidePanel.showItems(this.state),
        'atom-score:display-equip' : () => this.sidePanel.showEquip(this.state),
        'atom-score:display-none' : () => this.sidePanel.showNothing()
      }));

    this.subscriptions.add(
      atom.commands.onDidDispatch((e) => {
        if (e.type) {
          let stim = lookupStimulus(e.type);
          if (stim) {
            this.dispatch(addStim(stim));
          }
        }
      })
    );

    this.revert(state);
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
    this.panel.setState(this.state);
  },

  save() {
    this.savedState = JSON.stringify(this.state);
  },

  revert(state) {
    switch (true) {
    case typeof state === 'string':
      this.state = JSON.parse(state);
      break;
    case typeof state === 'object':
      this.state = state;
      break;
    case typeof state === 'undefined' && this.savedState:
      this.state = this.savedState;
      break;
    default:
      this.state = reset();
      break;
    }
    this.sidePanel.setState(this.state);
    this.panel.setState(this.state);
  }
};
