'use babel';

import { EFFECT, TYPE, ATTR } from '../../lib/items/data/constants';

describe('constants', () => {
  describe('attr', () => {
    Object
      .keys(ATTR)
      .forEach(sut => {
        const attr = ATTR[sut];
        describe(sut, () => {
          it('is a string', () => {
            expect(typeof attr).toBe('string');
          });
          it('is all uppercase', () => {
            expect(attr.toUpperCase()).toBe(attr);
          });
        });
      });
  });
  describe('type', () => {
    Object
      .keys(TYPE)
      .forEach(sut => {
        const type = TYPE[sut];
        describe(sut, () => {
          it('is a string', () => {
            expect(typeof type).toBe('string');
          });
          it('is all uppercase', () => {
            expect(type.toUpperCase()).toBe(type);
          });
        });
      });
  });
  describe('effect', () => {
    Object
      .keys(EFFECT)
      .forEach(sut => {
        const effect = EFFECT[sut];
        describe(sut, () => {
          it('is a string', () => {
            expect(typeof effect).toBe('string');
          });
          it('is all uppercase', () => {
            expect(effect.toUpperCase()).toBe(effect);
          });
        });
      });
  });
});
