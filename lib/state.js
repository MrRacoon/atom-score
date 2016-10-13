'use babel';

import { __, identity, gte, multiply, curry, max, min, add, inc, always, isEmpty, prepend, compose, reduce, take } from 'ramda';
import P, { define, modify, remove } from 'partial.lenses';
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

lens.items = P(lens.base('items'), define([]));

// sameSign :: Int -> Int -> Bool
const sameSign = compose(gte(__, 0), multiply);

// State transitions
export const addStim = curry((stim, state) =>
  foldState(state, [
    modify(lens.count, inc),
    modify(lens.score, add(stim.points)),
    modify(lens.high, max(state.score + stim.points)),
    modify(lens.low, min(state.score + stim.points)),
    modify(lens.streak, sameSign(stim.points, state.streak) ? add(stim.points) : always(stim.points)),
    modify(lens.streakH, max(state.streak + stim.points)),
    modify(lens.streakL, min(state.streak + stim.points)),
    modify(lens.last, always(stim)),
    modify(lens.recent, compose(take(60), prepend(stim))),
    modify(lens.histEntry(stim), inc),
    modify(lens.items, (state.count + 1) % ITEM_RATE === 0 ? prepend(newItem(state)) : identity)
  ].concat(isEmpty(state.last) ? [] : [
    modify(lens.guessEntry(stim, state.last), inc),
  ])));

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
    remove(lens.items)
  ]);

// State serialization
export const serialize   = state => JSON.stringify(state);
export const deserialize = state => JSON.parse(state);

// Utility
// foldState :: a -> [(a -> a)] -> a
const foldState = reduce((st, fn) => fn(st));