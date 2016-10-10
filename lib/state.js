'use babel';

import { curry, add, inc, always, isEmpty, prepend, compose, reduce, take } from 'ramda';
import P, { define, modify, remove, log } from 'partial.lenses';

export let lens = {};

// Base lens
lens.base = label => P(define({}), label, log(label));
// State lenses
lens.score   = P(lens.base('score'), define(0));
lens.count   = P(lens.base('count'), define(0));
lens.last    = P(lens.base('last'), define({}));
lens.recent  = P(lens.base('recent'), define([]));
lens.history = P(lens.base('history'), define({}));
lens.guess   = P(lens.base('guess'), define({}));

// Compound lenses
lens.histEntry = stim => P(lens.history, stim.id, define(0));
lens.guessEntry = (cur, last) => P(
  lens.guess,
    cur.id,
    define({}),
      last.id,
      define(0)
);

// State transitions
export const addStim = curry((stim, state) => {
  console.log('poop', state.last);
  const transformations = [
    modify(lens.score, add(stim.points)),
    modify(lens.count, inc),
    modify(lens.last, always(stim)),
    modify(lens.recent, compose(take(60), prepend(stim))),
    modify(lens.histEntry(stim), inc),
  ].concat(isEmpty(state.last) ? [] : [
    modify(lens.guessEntry(stim, state.last), inc),
  ]);
  return foldState(state, transformations);
});

export const resetStim = (state) => {
  return foldState(state, [
    remove(lens.score),
    remove(lens.count),
    remove(lens.last),
    remove(lens.recent),
    remove(lens.history),
    remove(lens.guess)
  ]);
};

// State serialization
export const serialize   = state => JSON.stringify(state);
export const deserialize = state => JSON.parse(state);

// Utility
// foldState :: a -> [(a -> a)] -> a
const foldState = reduce((s, fn) => fn(s));
