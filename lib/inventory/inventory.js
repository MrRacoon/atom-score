'use babel';

import { values, apply, append, map, prop, toPairs, compose, reduce } from 'ramda';
import { conditions, items, traits } from './attrs.json';
import Chance from 'chance';
const c = new Chance();

const unzip = reduce(
  ([as, bs], [a, b]) => [append(a, as), append(b, bs)],
  []
);

const newItem = state => {
  const condition = compose(
    apply(c.weighted.bind(c)),
    unzip,
    toPairs,
    map(prop('weight'))
  )(conditions);

  const traitSet = c.pickset(values(traits), c.weighted([1,2,3,4], [50, 25, 20, 5]));

  const condobj         = conditions[condition];
  const [name , item]   = c.pickone(toPairs(items));
  const origin          = c.city();
  const id              = state.count;
  const mod             = condobj.mod;
  const baseXp          = state.score < 1 ? 1 : Math.sqrt(state.score);
  const xp              = Math.log(baseXp) * mod * 10;
  const level           = Math.round(xp);
  const description     = item.description || 'You don\'t know anything about it..';
  return {
    type: item.type,
    icon: item.icon,
    traits: traitSet,
    id,
    level,
    xp,
    mod,
    name,
    description,
    wear : condition, // TODO change this name
    origin,
  };
};

export default newItem;
