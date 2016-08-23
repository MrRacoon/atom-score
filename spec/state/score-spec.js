'use babel';

import { types, score } from '../../lib/state';

import { should } from 'chai';
should();

describe('The score tracker', function () {

  describe('constants', function () {
    it('should exist', function () {
      expect(score.constants).toBeDefined();
    });
    describe('NAME', function () {
      it('should exist', function () {
        expect(score.constants.NAME).toBeDefined();
        score.constants.NAME.should.eql('score');
      });
    });
    describe('INITIAL_STATE', function () {
      it('should exist', function () {
        expect(score.constants.INITIAL_STATE).toBeDefined();
        score.constants.INITIAL_STATE.should.eql(0);
      });
    });
  });

  describe('reducer', function () {
    it('should exist', function () {
      expect(score.reducer).toBeDefined();
    });
    describe('when given an add message', function () {
      it('should add the amount to the score property of the state', function () {
        var amount = 1;
        score.reducer({}, types.actions.add({points: 7})).should.eql({
          [score.constants.NAME]: 7
        });
      });
    });
    describe('when given the reset method', function () {
      it('should reset the score to zero', function () {
        const state = score.reducer({score: 100}, types.actions.reset());
        state.score.should.be.eql(0)
      });
    });
  });
});
