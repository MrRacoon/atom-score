'use babel';

import { CompositeDisposable } from 'atom';
import { createStore } from 'redux';
import rootReducer from './rootReducer';
import { types } from './state';
import { stimuli, reinforcements } from './behavior';
import { SidePanel } from './components';
import { fromJS } from 'immutable';

export default {
  config: {
    sideBarWidth: {
      type: 'integer',
      default: 200,
      enum: [ 100, 200, 300, 400, 500 ]
    }
  },

  activate (state) {

    state.history   = fromJS(state.history);
    state.recent    = fromJS(state.recent);
    state.predictor = fromJS(state.predictor);

    this.store = createStore(rootReducer, {});

    this.reinforcements = new reinforcements();
    this.sidePanel      = new SidePanel();

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
    // TODO: do I need to destroy the store?
    this.subscriptions.dispose();
  },

  serialize () {
    const state = this.store.getState();
    return {
      score: state.score,
      count: state.count,
      history: state.history.toJS(),
      recent: state.recent.toJS(),
      predictor: state.predictor.toJS(),
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
