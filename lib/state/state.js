'use babel';

import { isEmpty, reduce, curry } from 'ramda';
import { remove } from 'partial.lenses';
import * as lens from './lenses';
import { ITEM_RATE } from '../constants';
import {
  countInc,
  scoreAdd,
  highScoreAdd,
  lowScoreAdd,
  streakAdd,
  highStreakAdd,
  lowStreakAdd,
  saveLastCommand,
  addToRecent,
  addHistEntry,
  addGuessEntry,
  foundItem
} from './modifiers';

export const addStim = curry((stim, state) => {
  // No consecutive commands
  const countConsec = atom.config.get('atom-score.consecutiveCommands');
  if (!countConsec && state.last && state.last.id === stim.id) { return state; }

  return foldState(state, [
    countInc(),
    scoreAdd(stim),
    highScoreAdd(stim),
    lowScoreAdd(stim),
    streakAdd(stim),
    highStreakAdd(stim),
    lowStreakAdd(stim),
    saveLastCommand(stim),
    addToRecent(stim),
    addHistEntry(stim)
  ]
  .concat(isEmpty(state.last) ? [] : [
    addGuessEntry(stim),
  ])
  .concat((state.count % ITEM_RATE) !== 0 ? [] : [
    foundItem(),
  ]));
});

export const reset = (state) =>
  foldState(state, [
    remove(lens.score),
    remove(lens.high),
    remove(lens.low),
    remove(lens.streak),
    remove(lens.streakH),
    remove(lens.streakL),
    remove(lens.count),
    remove(lens.last),
    remove(lens.recent),
    remove(lens.history),
    remove(lens.guess),
    remove(lens.items),
    remove(lens.equipment)
  ]);

// Utility
// foldState :: a -> [(a -> a)] -> a
const foldState = reduce((st, fn) => typeof fn === 'function' ? fn(st) : st);
