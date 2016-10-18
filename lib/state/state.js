'use babel';

import { min, max, add, always, take, isEmpty, prepend, reduce, compose, gte, __, multiply, curry, inc } from 'ramda';
import { modify, remove } from 'partial.lenses';
import * as lens from './lenses';
import { ITEM_RATE } from './constants';
import { newItem } from '../inventory';

export const addStim = curry((stim, state) => {
  // No consecutive commands
  const countConsec = atom.config.get('atom-score.consecutiveCommands');
  if (!countConsec && state.last && state.last.id === stim.id) { return state; }

  const i = newItem(state);
  return foldState(state, [
    modify(lens.count, inc),
    modify(lens.score, scoreMod(stim.points)),
    modify(lens.high, max(state.score + stim.points)),
    modify(lens.low, min(state.score + stim.points)),
    modify(lens.streak, sameSign(stim.points, state.streak) ? add(stim.points) : always(stim.points)),
    modify(lens.streakH, max(state.streak + stim.points)),
    modify(lens.streakL, min(state.streak + stim.points)),
    modify(lens.last, always(stim)),
    modify(lens.recent, compose(take(60), prepend(stim))),
    modify(lens.histEntry(stim), inc),
  ]
  .concat(isEmpty(state.last) ? [] : [
    modify(lens.guessEntry(stim, state.last), inc),
  ])
  .concat((state.count % ITEM_RATE) !== 0 ? [] : [
    modify(lens.items, compose(take(50), prepend(i))),
    modify(lens.equip(i), prev => prev.xp >= i.xp ? prev : i),
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
const foldState = reduce((st, fn) => fn(st));

// sameSign :: Int -> Int -> Bool
const sameSign = compose(gte(__, 0), multiply);

// scoreMod :: Num -> Num -> Num
const scoreMod = curry((points, score) => {
  const sm = score + points;
  return sm > 0 ? sm : 0;
});
