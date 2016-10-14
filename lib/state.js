'use babel';

import { __, gte, multiply, curry, max, min, add, inc, always, isEmpty, prepend, compose, reduce, take } from 'ramda';
import P, { define, modify, remove, log } from 'partial.lenses';
import { newItem } from './inventory';

const ITEM_RATE = 10;

export let lens = {};

// Base lens
lens.base = label => P(define({}), label);
// State lenses
lens.score   = P(lens.base('score'), define(0));
lens.high    = P(lens.base('high'), define(0));
lens.low     = P(lens.base('low'), define(0));
lens.streak  = P(lens.base('streak'), define(0));
lens.streakH = P(lens.base('streakH'), define(0));
lens.streakL = P(lens.base('streakL'), define(0));
lens.count   = P(lens.base('count'), define(0));
lens.last    = P(lens.base('last'), define({}));
lens.recent  = P(lens.base('recent'), define([]));
lens.guess   = P(lens.base('guess'), define({}));

lens.history   = P(lens.base('history'), define({}));
lens.histEntry = stim => P(lens.history, stim.id, define(0));

lens.guessEntry = (cur, last) => P(
  lens.guess,
    cur.id,
    define({}),
      last.id,
      define(0));

lens.lastEvent = P(lens.base('lastEvent'), define({}));
lens.items     = P(lens.base('items'), define([]));
lens.equipment = P(lens.base('equipment'), define({}), log('equipment'));
lens.equip     = item => P(lens.equipment, item.type, define({}));

// sameSign :: Int -> Int -> Bool
const sameSign = compose(gte(__, 0), multiply);

// State transitions
export const addStim = curry((stim, state) => {
  // No consecutive commands
  const countConsec = atom.config.get('atom-score.consecutiveCommands');
  if (!countConsec && state.last && state.last.id === stim.id) { return state; }

  const scoreMod = (points) => (score) => {
    const sm = score + points;
    return sm > 1 ? sm : 1;
  };

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
    modify(lens.items, prepend(i)),
    modify(lens.equip(i), prev => prev.xp >= i.xp ? prev : i),
  ]));
});

export const resetStim = (state) =>
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
    remove(lens.equipment),
  ]);

// State serialization
export const serialize   = state => JSON.stringify(state);
export const deserialize = state => JSON.parse(state);

// Utility
// foldState :: a -> [(a -> a)] -> a
const foldState = reduce((st, fn) => fn(st));
