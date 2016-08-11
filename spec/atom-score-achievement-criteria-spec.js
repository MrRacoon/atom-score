'use babel';

import {
  scoreEq,
  apmEq,
  keyCombo,
  cumulativeGroupCount,
  cumulativeGroupRate
} from '../lib/atom-score-achievement-criteria'

var ARBITRARY = 'deadbeef'

fakeScoreBoard = {
  score: -1,
  apm: 24,
  commands: ['^e', 'A', 'j', 'j', 'k', 'j'],
  spm: -1,
  counts: {
    'vim-mode:move-down': 3,
    'vim-mode:move-up': 1,
    'vim-mode:reset-normal-mode': 1,
    'vim-mode:insert-after-end-of-line': 1
  },
  latest: {
    points: 2,
    command: 'vim-mode:reset-normal-mode',
    key: '^e'
  }
}

fakeScoreBoard2 = {
  score: -2,
  apm: 28,
  commands: ['j', '^e', 'A', 'j', 'j', 'k', 'j'],
  spm: -2,
  counts: {
    'vim-mode:move-down': 4,
    'vim-mode:move-up': 1,
    'vim-mode:reset-normal-mode': 1,
    'vim-mode:insert-after-end-of-line': 1
  },
  latest: {
    points: -1,
    command: 'vim-mode:move-down',
    key: 'j'
  }
}

describe('collection of achievement criteria', function () {
  beforeEach(function () {

  });
  describe('scoreEq', function () {
    it('should return true when the scoreboard indicates the users score is equivilent', function () {
      expect(scoreEq(fakeScoreBoard.score)(fakeScoreBoard)).toBeTruthy();
    });
    it('should return false when the scoreboard indicates the users score is not equivilent', function () {
      expect(scoreEq(ARBITRARY)(fakeScoreBoard)).toBeFalsy();
    });
  });
  describe('apmEq', function () {
    it('should return true when the apm of the scoreboard is equvelent to the given value', function () {
      expect(apmEq(fakeScoreBoard.apm)).toBeTruthy();
    });
    it('should return false when the apm of the scoreboard is not equvelent to the given value', function () {
      expect(apmEq(ARBITRARY)(fakeScoreBoard)).toBeFalsy();
    });
  });
  describe('keyCombo', function () {
    it('should return true when the apm of the scoreboard is equvelent to the given value', function () {
      expect(keyCombo(['A', '^e'])(fakeScoreBoard)).toBeTruthy();
    });
    it('should return false when the apm of the scoreboard is not equvelent to the given value', function () {
      expect(apmEq(['j', 'k'])(fakeScoreBoard)).toBeFalsy();
      expect(apmEq(['k', 'j'])(fakeScoreBoard)).toBeFalsy();
      expect(apmEq(['j', 'j'])(fakeScoreBoard)).toBeFalsy();
      expect(apmEq(['j', 'A'])(fakeScoreBoard)).toBeFalsy();
    });
  });
  describe('cumulativeGroupCount', function () {
    it('should return true when the given count is equal to the sum of all given command counts', function () {
      var predicate = cumulativeGroupCount(4, ['vim-mode:move-down'])
      expect(predicate(fakeScoreBoard2)).toBeTruthy();
    });
    it('should return false when the given count is not equal to the sum of all given command counts', function () {
      var predicate = cumulativeGroupCount(3, ['vim-mode:move-down'])
      expect(predicate(fakeScoreBoard2)).toBeFalsy();
    });
  });
  describe('cumulativeGroupRate', function () {
    it('should return true when the given rate is equal to the sum of all given command counts modded by the rate', function () {
      expect(cumulativeGroupRate(4, ['vim-mode:move-down'])(fakeScoreBoard2)).toBeTruthy();
    });
    it('should return false when the given rate is not equal to the sum of all given command counts modded by the rate', function () {
      expect(cumulativeGroupRate(3, ['vim-mode:move-down'])(fakeScoreBoard2)).toBeFalsy();
    });
  });
});
