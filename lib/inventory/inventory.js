'use babel';

import { sample } from 'lodash/fp';
import { toPairs } from 'ramda';
import { types, origins, elements, wearing } from './attributes';

const newItem = state => {
  const [name, type] = sample(toPairs(types));
  const xp = Math.sqrt(state.count < 1 ? 1 : state.count);
  return {
    name,
    type,
    id         : state.count,
    wear       : sample(wearing),
    origin     : sample(origins),
    enhance    : sample(elements),
    resist     : sample(elements),
    experience : xp,
    level      : Math.round(xp),
  };
};

export default newItem;
