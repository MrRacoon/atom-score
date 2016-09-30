'use babel';

import * as state from './state';
import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { property, propertyOf } from 'lodash/fp';

export const score     = property(state.score.NAME);
export const count     = property(state.counter.NAME);
export const recent    = property(state.recent.NAME);
export const predictor = property(state.predictor.NAME);
export const last      = property(state.last.NAME);
export const history   = property(state.history.NAME);

export const recentCombos = createSelector(
  recent,
  r => r.map(property('combo'))
);

export const recentCombos20 = createSelector(
  recentCombos,
  c => c.take(20)
);

export const comboString = createSelector(
  recentCombos20,
  c => c.toJS().join('')
);

export const predictorMap = createSelector(
  predictor,
  p => p && p.toJS() || {}
);

export const lastTwoCommands = createSelector(
  recent,
  r => r.take(2)
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

export const predictSelector = (state) => {
  if (!state.recent || state.recent.size < 2) { return; }
  const lastStrokes  = lastTwoCommands(state).map(c => c.combo);
  const predictorMap = state.predictor.getIn(lastStrokes, new Map()).toJS();
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
