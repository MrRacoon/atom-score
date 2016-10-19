'use babel';

import { identity, min, max, always, take, prepend, reduce, compose, inc } from 'ramda';
import { modify } from 'partial.lenses';
import { newItem } from '../items';
import * as lens from './lenses';

export function countInc () {
  return function _countInc(state) {
    return modify(lens.count, inc, state);
  };
}

export function scoreAdd (stim) {
  return function _scoreAdd(state) {
    return modify(lens.score, scoreMod(stim.points), state);
  };
}
export function highScoreAdd (stim) {
  return function _highScoreAdd(state) {
    return modify(lens.high, max(state.score + stim.points), state);
  };
}
export function lowScoreAdd (stim) {
  return function _lowScoreAdd(state) {
    return modify(lens.low, min(state.score + stim.points), state);
  };
}

export function streakAdd (stim) {
  return function _streakAdd(state) {
    return modify(lens.streak, stim.points > 0 ? inc :  always(0), state);
  };
}
export function highStreakAdd (stim) {
  return function _highStreakAdd(state) {
    return modify(lens.streakH, max(state.streak + stim.points), state);
  };
}
export function lowStreakAdd(stim) {
  return function _lowStreakAdd(state) {
    return modify(lens.streakL, min(state.streak + stim.points), state);
  };
}

export function saveLastCommand (stim) {
  return function _saveLastCommand(state) {
    return modify(lens.last, always(stim), state);
  };
}

export function addToRecent (stim) {
  return function _addToRecent(state) {
    return modify(lens.recent, compose(take(60), prepend(stim)), state);
  };
}

export function addHistEntry (stim) {
  return function _addHistEntry(state) {
    return modify(lens.histEntry(stim), inc, state);
  };
}

export function addGuessEntry (stim) {
  return function _addGuessEntry(state) {
    return modify(lens.guessEntry(stim, state.last), inc, state);
  };
}

export function addItem(item) {
  return function _addItem(state) {
    return modify(lens.items, compose(take(50), prepend(item)), state);
  };
}

export function tryToEquip(item) {
  return function _tryToEquip(state) {
    return modify(lens.equip(item), prev => prev.xp >= item.xp ? prev : item, state);
  };
}

export function foundItem() {
  return function _foundItem(state) {
    const i = newItem(state);
    return compose(tryToEquip(i), addItem(i))(state);
  };
}

// Utility

// applyState :: a -> (a -> a) -> a
function applyState (state, fn) { return (fn || identity)(state); }

// foldState :: a -> [(a -> a)] -> a
export function foldState (state, fns) { return reduce(applyState, state, fns); }

// scoreMod :: Num -> Num -> Num
const scoreMod = (points) => (score) => {
  const sm = score + points;
  return sm > 0 ? sm : 0;
};
