'use babel';

import { CompositeDisposable } from 'atom';
import { map, merge } from 'ramda';
import { createStore } from 'redux';
import { tools } from 'reredeux';
import { stimConfig, stimuli } from './behavior';
import { SidePanel } from './components';
import { newItem } from './items';
import { init, actions, select, reducer } from './state2';

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
    this.sidePanel     = new SidePanel();
    this.subscriptions = new CompositeDisposable();

    this.revert(state);

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'atom-score:reset':      () => this.revert(init),
        'atom-score:hide-panel': () => this.sidePanel.hide(),
        'atom-score:show-panel': () => this.sidePanel.show(),
        'atom-score:save': () => this.save(),
        'atom-score:revert': () => this.revert(),
        'atom-score:display-points': () => this.sidePanel.showGraph(this.store.getState()),
        'atom-score:display-items': () => this.sidePanel.showItems(this.store.getState()),
        'atom-score:display-equip': () => this.sidePanel.showEquip(this.store.getState()),
        'atom-score:display-none': () => this.sidePanel.showNothing()
      }));

    stimuli.map(s => {
      this.subscriptions.add(
        atom.commands.add('atom-workspace', s.id, () => {
          this.dispatch(s);
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

    map(a =>
      a.update && this.store.dispatch(a.update(stim)),
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

    // const r = this.store.getState();
    // const guesser = select.predictor.guess(r)(stim);

    // tools.log(guesser);

  },

  dispatch (stim) {
    this.updateState(stim);
    this.updateView();
  },

  save() {
    this.savedState = JSON.stringify(this.store.getState());
  },

  revert(state) {
    switch (true) {
    case typeof state === 'string':
      this.store = createStore(reducer, JSON.parse(state));
      break;
    case typeof state === 'object':
      this.store = createStore(reducer, state);
      break;
    case typeof state === 'undefined' && this.savedState:
      this.store = createStore(reducer, this.savedState);
      break;
    default:
      this.store = createStore(reducer, init);
      break;
    }
    this.sidePanel.setState(this.store.getState());
  }
};
