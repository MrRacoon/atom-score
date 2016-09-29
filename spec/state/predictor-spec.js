'use babel';

import { types, predictor, recent } from '../../lib/state';
import { stimulusStub } from '../../lib/behavior/stimuli';
import { should } from 'chai';
should();

const { NAME, INITIAL_STATE, reducer } = predictor;
const state = {
  [NAME]: INITIAL_STATE,
  [recent.NAME]: recent.INITIAL_STATE.unshift(stimulusStub())
};
const stimulus = stimulusStub();
state[recent.NAME] = state[recent.NAME].unshift(stimulus);

describe('predictor', function () {
  it('should have a NAME', function () {
    expect(NAME).toBeDefined();
  });
  it('should have an INITIAL_STATE', function () {
    expect(INITIAL_STATE).toBeDefined();
  });
  describe('reducer', function () {
    describe('ADD', function () {
      it('should increment the count', function () {
        reducer(state, { type: types.ADD, stimulus })[NAME]
          .get(state[recent.NAME].get(1).combo)
          .get(state[recent.NAME].get(0).combo)
          .should.eql(1);
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
