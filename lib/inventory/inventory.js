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
  const xp              = Math.sqrt(state.count < 1 ? 1 : state.count);
  const mod             = (wMod + eMod + rMod + oMod) / 2;
  const level           = Math.round(Math.log(xp) * mod);
  return { id, level, xp, mod, name, type, wear, origin, enhance, resist };
};

export default newItem;
