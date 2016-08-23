'use babel';

import { counter, types } from '../../lib/state';
import { should } from 'chai';
should();

describe('The counter', function () {
  describe('constants', function () {
    it('should exist', function () {
      expect(counter.constants).toBeDefined();
    });
    describe('NAME', function () {
      it('should exist', function () {
        expect(counter.constants.NAME).toBeDefined();
        counter.constants.NAME.should.eql('count');
      });
    });
    describe('INITIAL_STATE', function () {
      it('should exist', function () {
        expect(counter.constants.INITIAL_STATE).toBeDefined();
        counter.constants.INITIAL_STATE.should.eql(0);
      });
    });
  });
  describe('reducer', function () {
    it('should exist', function () {
      expect(counter.reducer).toBeDefined();
    });
    describe('on INIT', function () {
      it('should properly initialize', function () {
        counter.reducer({}, {type: '@@redux/init'}).should.eql({
          [counter.constants.NAME]: counter.constants.INITIAL_STATE
        });
      });
    });
    describe('when given the ADD message', function () {
      it('should increment the counter by 1', function () {
        const prev = { count: 4 };
        counter.reducer(prev, types.actions.add({})).should.eql({ count: 5 });
      });
    });
    describe('when given the RESET message', function () {
      it('should reset the counter to 0', function () {
        const prev = { count: 4 };
        counter.reducer(prev, types.actions.reset()).should.eql({ count: 0 });
      });
    });
  });
});
