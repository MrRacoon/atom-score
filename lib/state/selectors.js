'use babel';

import * as lenses from './lenses';
import { get } from 'partial.lenses';
import { join, take, propOr, keys, reduce, toPairs, compose, map, values, prop } from 'ramda';
import { lookupStimulus } from '../behavior';

export const stimulus = lookupStimulus;

export const score     = get(lenses.score);
export const high      = get(lenses.high);
export const low       = get(lenses.low);
export const streak    = get(lenses.streak);
export const streakH   = get(lenses.streakH);
export const streakL   = get(lenses.streakL);
export const count     = get(lenses.count);
export const recent    = get(lenses.recent);
export const last      = get(lenses.last);
export const history   = get(lenses.history);
export const guess     = get(lenses.guess);
export const items     = get(lenses.items);
export const equipment = get(lenses.equipment);

export const equipmentList = compose(
  values,
  equipment
);

export const recentCombos = compose(
  map(prop('combo')),
  recent
);

export const comboString = compose(
  join(''),
  recentCombos
);

export const lastTwoCommands = compose(
  take(2),
  recent
);

export const lastCount = state =>
  history(state)[lastName(state)];

export const lastName = compose(
  propOr('', 'id'),
  last
);

export const lastCombo = compose(
  propOr('', 'combo'),
  last
);

export const lastCommand = compose(
  propOr('', 'command'),
  last
);

export const lastPoints = compose(
  propOr(0, 'points'),
  last
);

// historyKeys :: State -> [String]
export const historyKeys = compose(
  keys,
  history
);

// historyVals :: State -> [String]
export const historyVals = compose(
  values,
  history
);

export const avgScore = state => {
  const s = score(state);
  const c = count(state);
  return s / c || 0;
};

export const predict = state => {
  return compose(
    prop(0),
    reduce((s, n) => s[1] > n[1] ? s : n, ['???', -Infinity]),
    toPairs,
    propOr({}, lastName(state))
  )(guess(state));
};

export const predictedStim = compose(
  lookupStimulus,
  predict
);
