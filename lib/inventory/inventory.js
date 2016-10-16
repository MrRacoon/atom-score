'use babel';

import { apply, append, map, prop, toPairs, compose, reduce } from 'ramda';
import { conditions, origins, items } from './attrs.json';
import Chance from 'chance';
const c = new Chance();

const unzip = (xs) => reduce(
  ([as, bs], [a, b]) => [append(a, as), append(b, bs)],
  [],
  xs
);

const newItem = state => {
  const condition = compose(
    apply(c.weighted.bind(c)),
    unzip,
    toPairs,
    map(prop('weight'))
  )(conditions);

  const condobj         = conditions[condition];
  const [name , item]   = c.pickone(toPairs(items));
  const [origin , oMod] = c.pickone(toPairs(origins));
  const id              = state.count;
  const baseXp          = state.score < 1 ? 1 : Math.sqrt(state.score);
  const mod             = (condobj.mod + oMod + Math.random()) / 4;
  const xp              = Math.log(baseXp * mod) * 10;
  const level           = Math.round(xp);
  const description     = item.description || 'You don\'t know anything about it..';
  return {
    type: item.type,
    icon: item.icon,
    id,
    level,
    xp,
    mod,
    name,
    description,
    wear : condition,
    origin,
  };
};

export default newItem;
