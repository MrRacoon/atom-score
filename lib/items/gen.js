'use babel';

import { values, apply, append, map, prop, toPairs, compose, reduce } from 'ramda';
import { conditions, items, traits } from './data.json';
import Chance from 'chance';
const c = new Chance();

const unzip = reduce(
  ([as, bs], [a, b]) => [append(a, as), append(b, bs)],
  []
);

function xpr (state) {
  if (!state.high) { return 0; }
  const perc = state.score / state.high;
  const base = state.score * perc;
  const mod  = state.streak * perc;
  return base + mod;
}

function newItem (state) {
  const condition = compose(
    apply(c.weighted.bind(c)),
    unzip,
    toPairs,
    map(prop('weight'))
  )(conditions);

  const traitSet = c.pickset(values(traits), c.weighted([1,2,3,4], [50, 25, 20, 5]));

  const condobj       = conditions[condition];
  const [name , item] = c.pickone(toPairs(items));
  const origin        = c.city();
  const id            = state.count;
  const mod           = condobj.mod;
  const xp            = xpr(state) * mod;
  const level         = Math.round(xp);
  const description   = item.description || 'You don\'t know anything about it..';
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
}

export default newItem;
