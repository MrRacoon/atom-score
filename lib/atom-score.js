'use babel';

import { CompositeDisposable } from 'atom';
import { merge } from 'ramda';
import { lookupStimulus, stimConfig} from './behavior';
import { SidePanel, Panel } from './components';
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
    this.state.items = undefined;

    this.panel = new Panel();
    this.panel.setState(this.state);
    this.sidePanel = new SidePanel();
    this.sidePanel.setState(this.state);

    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'atom-score:reset' : () => this.reset(),
        'atom-score:hide-panel' : () => this.sidePanel.hide(),
        'atom-score:show-panel' : () => this.sidePanel.show(),
        'atom-score:display-points' : () => this.sidePanel.showGraph(),
        'atom-score:display-items' : () => this.sidePanel.showItems(),
        'atom-score:display-none' : () => this.sidePanel.showNil()
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

  reset () {
    this.dispatch(resetStim);
  }
};
