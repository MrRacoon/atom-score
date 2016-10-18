'use babel';

import P, { define } from 'partial.lenses';

// Base lens
export const base = label => P(define({}), label);
// State lenses
export const score     = P(base('score'), define(0));
export const high      = P(base('high'), define(0));
export const low       = P(base('low'), define(0));
export const streak    = P(base('streak'), define(0));
export const streakH   = P(base('streakH'), define(0));
export const streakL   = P(base('streakL'), define(0));
export const count     = P(base('count'), define(0));
export const last      = P(base('last'), define({}));
export const recent    = P(base('recent'), define([]));
export const guess     = P(base('guess'), define({}));
export const history   = P(base('history'), define({}));
export const lastEvent = P(base('lastEvent'), define({}));
export const items     = P(base('items'), define([]));
export const equipment = P(base('equipment'), define({}));

export const equip      = item => P(equipment, item.type, define({}));
export const histEntry  = stim => P(history, stim.id, define(0));
export const guessEntry = (cur, last) => P(
  guess,
    cur.id,
    define({}),
      last.id,
      define(0));
