'use babel';

import AtomScoreBoard from '../lib/atom-score-board'
import { Rule } from '../lib/atom-score-rules'

let board, fakeEntry;

describe('A score keeper', function () {
  beforeEach(function () {
    board     = new AtomScoreBoard()
    fakeEntry = new Rule('j', 'vim-mode:move-down', -1)
    fakeEntry.resetTime()
    board.addEntry(fakeEntry)
  });

  describe('The initial state', function () {
    it('should set score', function () {
      expect(board.score()).toEqual(fakeEntry.points)
    });
    it('should set apm', function () {
      expect(board.apm()).toEqual(2)
    });
    it('should set history', function () {
      expect(board.history()).toEqual({'vim-mode:move-down': 1})
    });
  });

  describe('when asked to reset', function () {
    beforeEach(function () {
      board.reset()
    });
    it('should reset the score', function () {
      expect(board.score()).toEqual(0)
    });
    it('should reset the apm', function () {
      expect(board.apm()).toEqual(0)
    });
    it('should not reset the history', function () {
      expect(board.history()).toEqual({})
    });
  });

});
