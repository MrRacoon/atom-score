'use babel';

import { CompositeDisposable } from 'atom';
import { createStore } from 'redux';
import rootReducer from './rootReducer';
import { types } from './state';
import { stimuli } from './behavior';
import { SidePanel } from './components';
// import { fromJS } from 'immutable';

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
    state.last    = (typeof state.last    === 'string') ? JSON.parse(state.last)    : state.last;
    state.recent  = (typeof state.recent  === 'string') ? JSON.parse(state.recent)  : state.recent;
    state.history = (typeof state.history === 'string') ? JSON.parse(state.history) : state.history;

    this.store = createStore(rootReducer, state);

    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-score:reset'      : () => this.reset(),
      'atom-score:hide-panel' : () => this.sidePanel.hide(),
      'atom-score:show-panel' : () => this.sidePanel.show()
    }));

    stimuli.map(stim => this.subscriptions.add(
      atom.commands.add('atom-workspace', stim.id, () => this.trigger(stim))
    ));

    this.sidePanel      = new SidePanel();
  },

  deactivate () {
    // TODO: do I need to destroy the store?
    this.subscriptions.dispose();
  },

  serialize () {
    const state = this.store.getState();
    return {
      score   : state.score,
      count   : state.count,
      last    : JSON.stringify(state.last),
      recent  : JSON.stringify(state.recent),
      history : JSON.stringify(state.history),
    };
  },

  trigger (stimulus) {
    this.store.dispatch(types.add(stimulus));
    this.sidePanel.setState(this.store.getState());
  },

  reset () {
    this.store.dispatch(types.reset());
    this.sidePanel.setState(this.store.getState());
  }
};
