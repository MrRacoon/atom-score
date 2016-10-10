'use babel';

import { createSelector } from 'reselect';
import { property, propertyOf } from 'lodash/fp';
import { identity, map, prop, take, join } from 'ramda';

export const score     = property('score');
export const count     = property('count');
export const recent    = property('recent');
export const last      = property('last');
export const history   = property('history');

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

export const lastTwoCommands = createSelector(
  recent,
  take(2)
);

export const lastCount = createSelector(
  last,
  history,
  (l, h) => h[l.id]
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
