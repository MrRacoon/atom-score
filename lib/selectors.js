'use babel';

import { createSelector } from 'reselect';
import {
  identity,
  prop,
  map,
  values,
  take,
  join,
  compose,
  reduce,
  toPairs,
} from 'ramda';

export const score   = prop('score');
export const count   = prop('count');
export const recent  = prop('recent');
export const last    = prop('last');
export const history = prop('history');
export const guess   = prop('guess');

export const recentCombos = createSelector(
  recent,
  map(prop('combo'))
);

// HACK
// s/identity/take(20)/
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
  prop('id')
);

export const lastCombo = createSelector(
  last,
  prop('combo')
);

export const lastCommand = createSelector(
  last,
  prop('command')
);

export const lastPoints = createSelector(
  last,
  prop('points')
);

// historyKeys :: State -> [String]
export const historyKeys = createSelector(
  history,
  Object.keys
);

// historyVals :: State -> [String]
export const historyVals = createSelector(
  history,
  values
);

export const avgScore = createSelector(
    score,
    count,
    (s, c) => s / c || 0
);

export const predict = createSelector(
  guess,
  last,
  (g, l) => compose(
    prop(0),
    reduce((s, n) => s[1] > n[1] ? s : n, ['???', -Infinity]),
    toPairs
  )(g[l.id])
);
