'use babel';

import Chance from 'chance';
import { TYPE } from './constants';
import * as MODS from './mods';
import * as ITEMS from './items';

const c = new Chance();

const pickOne = (obj) =>
  c.pickone(
    Object
      .keys(obj)
      .map(key => obj[key])
  );

export const generate = (seed) => ({
  ...pickOne(ITEMS),
  mods: [pickOne(MODS)],
});
