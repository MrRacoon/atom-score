'use babel';

import { add, inc, always, prepend, compose, reduce, take } from 'ramda';
import P, { define, modify, remove, log } from 'partial.lenses';

export let lens = {};

// Base state lens
lens.base = define({});

// State lenses
lens.score   = P(lens.base, 'score'  , define(0) , log('score'));
lens.count   = P(lens.base, 'count'  , define(0) , log('count'));
lens.last    = P(lens.base, 'last'   , define({}), log('last'));
lens.recent  = P(lens.base, 'recent' , define([]), log('recent'));
lens.history = P(lens.base, 'history', define({}), log('history'));

// Compound lenses
lens.histEntry = stim => P(lens.history, stim.id, define(0));

// State transitions
export const addStim = (state, stim) => {
  return foldState(state, [
    modify(lens.score, add(stim.points)),
    modify(lens.count, inc),
    modify(lens.last, always(stim)),
    modify(lens.recent, compose(take(60), prepend(stim))),
    modify(lens.histEntry(stim), inc)
  ]);
};

export const resetStim = (state) => {
  return foldState(state, [
    remove(lens.score),
    remove(lens.count),
    remove(lens.last),
    remove(lens.recent),
    remove(lens.history)
  ]);
};

// State serialization
export const serialize   = state => JSON.stringify(state);
export const deserialize = state => JSON.parse(state);

// Utility
// foldState :: a -> [(a -> a)] -> a
const foldState = reduce((s, fn) => fn(s));
