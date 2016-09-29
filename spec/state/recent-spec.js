'use babel';

import { types, recent } from '../../lib/state';
import { stimulusStub } from '../../lib/behavior/stimuli';
import { List } from 'immutable';
import { should } from 'chai';
should();

const { NAME, INITIAL_STATE, reducer } = recent;
const state = { [NAME]: INITIAL_STATE };
const stimulus = stimulusStub();

describe('recent', function () {
  it('should have a NAME', function () {
    expect(NAME).toBeDefined();
  });
  it('should have an INITIAL_STATE', function () {
    expect(INITIAL_STATE).toBeDefined();
  });
  describe('reducer', function () {
    describe('ADD', function () {
      it('should add the stimulus to a list', function () {
        reducer(state, { type: types.ADD, stimulus })[NAME]
          .equals(List.of(stimulus)).should.be.true;
      });
    });
    describe('RESET', function () {
      it('should reset to the INITIAL_STATE', function () {
        reducer(state, { type: types.RESET })[NAME]
          .should.eql(INITIAL_STATE);
      });
    });
  });
});
