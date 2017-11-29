'use babel';

import { generate } from '../../lib/items/data/index';

const samples = Array.apply(null, Array(100))
  .map((x,i) => generate(i));

describe('items', () => {
  samples.forEach((sample) => {
    describe(sample.name, () => {
      it('has a name', () => {
        expect(sample.name).toBeDefined;
      });
      it('has a type', () => {
        expect(sample.type).toBeDefined;
      });
      it('has a description', () => {
        expect(sample.desc).toBeDefined;
      });
      it('has mods', () => {
        expect(sample.mods.length > 0).toBe(true);
      });
    });
  })
});
