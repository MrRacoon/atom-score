'use babel';

import { __, prepend, compose, find, always } from 'ramda';
import { Just, Nothing } from 'data.maybe';
import { sample } from 'lodash/fp';

const ITEM_RATE = 10;

const itemBag = (bag = []) => ({
  bag,
  all    : always(bag),
  isEmpty: !bag.length,
  find   : find(__, bag),
  add    : compose(itemBag, prepend(__, bag)),
  rand   : () => sample(bag),
  last   : bag.length ? bag[0] : undefined,
  found  : state => item(state)
    .map(i => itemBag(prepend(i, bag)))
    .getOrElse(itemBag(bag)),
});


const item = state =>
  (state.count % ITEM_RATE !== 0 ? Nothing()
  : Just({
    name: sample(types),
    origin: sample(origins),
    enchantment: sample(enchantments),
    experience: Math.sqrt(state.count),
    level: state.count < 0 ? 1 : Math.round(Math.sqrt(state.count) / 2),
  }));

export default itemBag;

const types = [
  'sword',
  'sweat pants',
  'kicks',
  'shades',
  'socks',
  'hat',
  'scarf',
  'cape',
  'gloves',
  'bracelet',
  'belt',
  'robe',
  'earing',
  'shirt',
  'sweater',
  'shorts',
  'jeans',
  'cargo pants'
];

const origins = [
  'bethos',
  'lanwhin',
  'baltimore',
  'gorgon',
  'greyscale',
  'booleana',
  'loremipsumis',
  'fantasmo',
  'flaggor'
];

const enchantments = [
  'fire',
  'ice',
  'lightning',
  'spirit',
  'light',
  'darkness',
  'leech',
  'healing',
  'weightless'
];
