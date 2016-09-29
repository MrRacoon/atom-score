'use babel';

import { types, counter } from '../../lib/state';
import { stimulusStub } from '../../lib/behavior/stimuli';
import { should } from 'chai';
should();

const { NAME, INITIAL_STATE, reducer } = counter;
const state = { [NAME]: INITIAL_STATE };
const stimulus = stimulusStub();

describe('The counter', function () {
  it('should have a NAME', function () {
    expect(NAME).toBeDefined();
  });
  it('should have an INITIAL_STATE', function () {
    expect(INITIAL_STATE).toBeDefined();
  });
  describe('reducer', function () {
    describe('ADD', function () {
      it('should increment the count', function () {
        reducer(state, { type: types.ADD, stimulus })[NAME].should.eql(INITIAL_STATE+1);
      });
    });
    describe('RESET', function () {
      it('should reset to the INITIAL_STATE', function () {
        reducer(state, { type: types.RESET })[NAME].should.eql(INITIAL_STATE);
      });
    });
  });
});
