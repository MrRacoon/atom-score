'use babel';

import { CompositeDisposable } from 'atom';
import { map, merge } from 'ramda';
import { createStore } from 'redux';
// import { tools } from 'reredeux';
import { stimConfig, stimuli } from './behavior';
import { SidePanel } from './components';
import { newItem } from './items';
import { init, actions, select, reducer } from './state';

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
    seed: {
      type: 'integer',
      description: 'use a different seed for random generation',
      default: 1,
    },
  }, stimConfig),

  activate (state) {
    this.sidePanel     = new SidePanel();
    this.subscriptions = new CompositeDisposable();

    this.revert(state);

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'atom-score:reset':      () => this.revert(init),
        'atom-score:hide': () => this.sidePanel.hide(),
        'atom-score:show': () => this.sidePanel.show(),
        'atom-score:toggle': () => this.sidePanel.toggle(),
        'atom-score:revert': () => this.revert(),
        'atom-score:display-points': () => this.sidePanel.showGraph(this.store.getState()),
        'atom-score:display-items': () => this.sidePanel.showItems(this.store.getState()),
        'atom-score:display-equip': () => this.sidePanel.showEquip(this.store.getState()),
        'atom-score:display-none': () => this.sidePanel.showNothing()
      }));

    stimuli.map(s => {
      this.subscriptions.add(
        atom.commands.add('atom-text-editor', s.id, () => {
          this.update(s);
        })
      );
    });
  },

  deactivate () {
    this.subscriptions.dispose();
  },

  serialize () {
    return JSON.stringify(this.store.getState());
  },

  updateView () {
    const s = this.store.getState();
    this.sidePanel.setState(s);
  },

  updateState (stim) {
    const s = this.store.getState();

    map(
      a => a.update && this.store.dispatch(a.update(stim)),
      actions
    );

    const t = this.store.getState();

    const curr = select.last._(t);
    const last = select.last._(s);
    this.store.dispatch(
      actions.predictor.remember(last, curr)
    );

    if (t.counter % 10 === 0) {
      this.store.dispatch(
        actions.items.add(newItem(t))
      );
    }
  },

  update (stim) {
    this.updateState(stim);
    this.updateView();
  },

  revert(state) {
    console.log(state);
    switch (true) {
    // on Init load
    case typeof state === 'string':
      this.store = createStore(reducer, JSON.parse(state));
      break;
    // odd conditions
    case typeof state === 'object' && !Object.keys(state).length:
      this.store = createStore(reducer, init);
      break;
    // reload
    case typeof state === 'object':
      this.store = createStore(reducer, state);
      break;
    // init init load
    default:
      this.store = createStore(reducer, init);
      break;
    }
    this.sidePanel.setState(this.store.getState());
  }
};
