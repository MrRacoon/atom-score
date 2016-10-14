'use babel';

import { sample } from 'lodash/fp';
import { toPairs } from 'ramda';
import { types, origins, elements, wearing } from './attributes';

const newItem = state => {
  const [name   , type] = sample(toPairs(types));
  const [wear   , wMod] = sample(toPairs(wearing));
  const [enhance, eMod] = sample(toPairs(elements));
  const [resist , rMod] = sample(toPairs(elements));
  const [origin , oMod] = sample(toPairs(origins));
  const id              = state.count;
  const baseXp          = (state.score < 1 ? 1 : Math.sqrt(state.score));
  const mod             = (wMod + eMod + rMod + oMod + Math.random()) / 5;
  const xp              = Math.log(baseXp * mod) * 10;
  const level           = Math.round(xp);
  return { id, level, xp, mod, name, type, wear, origin, enhance, resist };
};

export default newItem;
