'use babel';

import AtomScoreBoard from '../lib/atom-score-board'
import { Rule } from '../lib/atom-score-rules'

let board, fakeEvent;

describe('A score keeper', function () {
  beforeEach(function () {
    board     = new AtomScoreBoard()
    fakeEvent = new Rule('j', 'vim-mode:move-down', -1)
    board.addEvent(fakeEvent)
  });

  describe('The initial state', function () {
    it('should set score', function () {
      expect(board.score()).toEqual(fakeEvent.points)
    });
    it('should set apm', function () {
      expect(board.apm()).toEqual(4)
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
  });

});
