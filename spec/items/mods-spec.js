'use babel';

import * as MODS from '../../lib/items/data/mods';
import { EFFECT, TYPE } from '../../lib/items/data/constants';

console.log('MODS', MODS);

describe('Mods', () => {
  Object
    .keys(MODS)
    .forEach(sut => {
      const mod = MODS[sut];
      describe(sut, () => {
        it('is defined', () => {
          expect(mod).toBeDefined;
        });
        it('has a name', () => {
          expect(mod.name).toBeDefined;
        });
        it('has a type', () => {
          expect(mod.type).toBeDefined;
          expect(TYPE[mod.type]).toBeDefined;
        });
        it('has an effect', () => {
          expect(mod.effect).toBeDefined;
          expect(EFFECT[mod.effect]).toBeDefined;
        });
        it('has an amount', () => {
          expect(mod.amount).toBeDefined;
        });
      });
    })
});
