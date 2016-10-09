'use babel';

import * as state from './state';
import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { property, propertyOf } from 'lodash/fp';
import { reverse, sortBy, toPairs, propOr, compose, identity, map, prop, take, join } from 'ramda';
import { get } from 'partial.lenses';
// import { get } from 'partial.lenses';

export const score     = property(state.score.NAME);
export const count     = property(state.counter.NAME);
export const recent    = property(state.recent.NAME);
export const predictor = property(state.predictor.NAME);
export const last      = property(state.last.NAME);
export const history   = property(state.history.NAME);

export const recentCombos = createSelector(
  recent,
  map(prop('combo'))
);

export const recentCombos20 = createSelector(
  recentCombos,
  identity
);

export const comboString = createSelector(
  recentCombos20,
  join('')
);

export const predictorMap = createSelector(
  predictor,
  p => p && p.toJS() || {}
);

export const lastTwoCommands = createSelector(
  recent,
  take(2)
);

export const lastCount = createSelector(
  last,
  history,
  (l, h) => {
    return h.get(l.id);
  }
);

export const lastName = createSelector(
  last,
  property('id')
);

export const lastCombo = createSelector(
  last,
  property('combo')
);

export const lastPoints = createSelector(
  last,
  property('points')
);

const highestValue = compose(
  propOr('???', 0),
  propOr([], 0),
  reverse,
  sortBy(prop(1)),
  toPairs
);

export const predict = (st) => {
  const guesses = get(state.lens.predictor.tab(st.recent), st);
  return highestValue(guesses);
};

export const predictSelector = (st) => {
  if (!st.recent || st.recent.length < 2) { return; }
  const lastStrokes  = lastTwoCommands(st).map(c => c.combo);
  const predictorMap = st.predictor.getIn(lastStrokes, new Map()).toJS();
  const keys = Object.keys(predictorMap);
  const acc  = keys.reduce((max, key) => (predictorMap[max] || 0) > predictorMap[key] ? max : key, '');
  return acc;
};


export const _history = createSelector(
  history,
  h => h.toJS()
);

export const keys = createSelector(
  _history,
  Object.keys
);

export const vals = createSelector(
  _history,
  keys,
  (h, k) => k.map(propertyOf(h))
);

export const avgScore = createSelector(
    score,
    count,
    (s, c) => s / c || 0
);
