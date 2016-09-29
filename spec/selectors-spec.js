'use babel';

import * as select from '../lib/selectors';

import Immutable from 'immutable';
import { should } from 'chai';
should();


let state;

beforeEach(function () {
  state = {
    score: 1337,
    count: 42,
    history: Immutable.Map.of('deadbeef', 9),
    last: {
      id: 'deadbeef',
      combo: 'x',
      points: 2
    },
    recent: Immutable.List.of({ combo: 'x' })
  };
});

describe('The data munging interface', function () {
  describe('the score method', function () {
    it('should return the score of the state object', function () {
      select.score(state).should.eql(1337);
    });
  });
  describe('the count method', function () {
    it('should return the count of stimuli seen total', function () {
      select.count(state).should.eql(42);
    });
  });
  describe('the lastCount method', function () {
    it('should return the number of times the stimulus has been seen', function () {
      select.lastCount({id: 'deadbeef'})(state).should.eql(9);
    });
  });
  describe('the lastName method', function () {
    it('should return the combo of the stimulus that was last seen', function () {
      select.lastName(state).should.eql('x');
    });
  });
  describe('the comboString method', function () {
    it('should return the string of up to 20 combos from recently seen stimuli', function () {
      select.comboString(state).should.eql('x');
    });
  });
});
