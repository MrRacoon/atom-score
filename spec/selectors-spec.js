'use babel';

import * as select from '../lib/state/selectors';
import { repeat } from 'ramda';
import { stimulusStub } from '../lib/behavior/stimuli';

import { should } from 'chai';
should();

const REPETITIONS = 3;
const stim = stimulusStub();

let state;

beforeEach(function () {
  state = {
    score: stim.points * REPETITIONS,
    count: REPETITIONS,
    history: {
      [stim.id]: REPETITIONS,
    },
    last: stim,
    recent: repeat(stim, REPETITIONS),
  };
});

describe('Selectors', function () {
  describe('the score method', function () {
    it('should return the score of the state object', function () {
      select.score(state).should.eql(stim.points * REPETITIONS);
    });
  });
  describe('the count method', function () {
    it('should return the count of stimuli seen total', function () {
      select.count(state).should.eql(REPETITIONS);
    });
  });
  describe('the lastCount method', function () {
    it('should return the number of times the stimulus has been seen', function () {
      select.lastCount(state).should.eql(REPETITIONS);
    });
  });
  describe('the lastName method', function () {
    it('should return the id/name of the stimulus that was last seen', function () {
      select.lastName(state).should.eql(state.last.id);
    });
  });
  describe('the lastCombo method', function () {
    it('should return the combo of the stimulus that was last seen', function () {
      select.lastCombo(state).should.eql(state.last.combo);
    });
  });
  describe('the lastPoints method', function () {
    it('should return the points of the stimulus that was last seen', function () {
      select.lastPoints(state).should.eql(state.last.points);
    });
  });
  describe('the comboString method', function () {
    it('should return the string of up to 20 combos from recently seen stimuli', function () {
      select.comboString(state).should.eql(repeat(stim.combo, REPETITIONS).join(''));
    });
  });
});
