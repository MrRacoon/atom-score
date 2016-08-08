'use babel';

import AtomScoreBoard from '../lib/atom-score-board'

let board, fakeEntry;

describe('A score keeper', function () {
  beforeEach(function () {
    board = new AtomScoreBoard()

  });

  describe('when asked to reset', function () {
    beforeEach(function () {
      board.state.score = 5
      board.state.apmList = [{}]
      board.state.history = {
        'vim-mode:move-up': 5
      }
      board.reset()
    });

    it('should reset the score', function () {
      expect(board.score()).toEqual(0)
    });

    it('should reset the apm', function () {
      expect(board.apm()).toEqual(0)
    });

    it('should not reset the history', function () {
      expect(board.history()).toEqual()
    });
  });

  describe('when adding events', function () {
    var fakeEvent;

    beforeEach(function () {
      fakeEvent = {
        command: 'vim-mode:move-up',
        points: 5,
      }
    });

  });
});
