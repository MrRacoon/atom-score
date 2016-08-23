'use babel';

import { types, history } from '../../lib/state';
import { Map } from 'immutable';
import { should } from 'chai';
should();

describe('The History keeper', function () {
  describe('constants', function () {
    it('should exist', function () {
      expect(history.constants).toBeDefined();
    });
    describe('NAME', function () {
      it('should exist', function () {
        expect(history.constants.NAME).toBeDefined();
        history.constants.NAME.should.eql('history');
      });
    });
    describe('INITIAL_STATE', function () {
      it('should exist', function () {
        expect(history.constants.INITIAL_STATE).toBeDefined();
        history.constants.INITIAL_STATE.should.eql(Map());
      });
    });
  });
  describe('reducer', function () {
    it('should exist', function () {
      expect(history.reducer).toBeDefined();
    });
    describe('on INIT', function () {
      it('should properly initialize', function () {
        history.reducer({}, {type: '@@redux/init'}).should.eql({
          [history.constants.NAME]: history.constants.INITIAL_STATE
        });
      });
    });
    describe('when given the add message', function () {
      it('should increment the command count for the given stimulus', function () {
        const stimulus = { id : 'arb'};
        var newState = history.reducer({}, types.actions.add(stimulus));
        newState[history.constants.NAME].get(stimulus.id).should.be.eql(1);
      });
    });
    describe('when given the reset message', function () {
      it('should empty all command counts', function () {

      });
    });
  });
});
