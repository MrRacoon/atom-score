'use babel'

import { types, actions } from '../../lib/counter'

const ARBITRARY = 'DEADBEEF'

describe('Counter actions', function () {
  describe('increment', function () {
    it('should return an action with the type INC', function () {
      expect(actions.increment(ARBITRARY)).toEqual({
        type: types.INCREMENT,
        amount: ARBITRARY
      })
    });
  });
  describe('set', function () {
    it('should return the action for setting the counter', function () {
      expect(actions.set(ARBITRARY)).toEqual({
        type: types.SET,
        amount: ARBITRARY
      })
    });
  });
  describe('reset', function () {
    it('should return an action for resetting the counter to 0', function () {
      expect(actions.reset()).toEqual({
        type: types.SET,
        amount: 0
      })
    });
  });
});
