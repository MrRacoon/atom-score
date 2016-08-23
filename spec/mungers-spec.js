'use babel';

import Immutable from 'immutable';
import * as mungers from '../lib/mungers';
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
  describe('the getScore method', function () {
    it('should return the score of the state object', function () {
      mungers.getScore(state).should.eql(1337);
    });
  });
  describe('the getCount method', function () {
    it('should return the count of stimuli seen total', function () {
      mungers.getCount(state).should.eql(42);
    });
  });
  describe('the commandCount method', function () {
    it('should return the number of times the stimulus has been seen', function () {
      mungers.commandCount({id: 'deadbeef'})(state).should.eql(9);
    });
  });
  describe('the lastCommandName method', function () {
    it('should return the combo of the stimulus that was last seen', function () {
      mungers.lastCommandName(state).should.eql('x');
    });
  });
  describe('the recentVimString method', function () {
    it('should return the string of up to 20 combos from recently seen stimuli', function () {
      mungers.recentVimString(state).should.eql('x');
    });
  });
});

/*
export const recentVimString = state => state.recent.take(20).map(s => s.combo).toJS().join('');

*/
