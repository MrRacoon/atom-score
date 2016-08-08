'use babel';

import AtomScoreBoard from '../lib/atom-score-board'

let board;

fdescribe('A score keeper', function () {
  beforeEach(function () {
    board = new AtomScoreBoard()
  });

  describe('when asked to reset', function () {
    beforeEach(function () {
      board.state.score = 5
      board.reset()
    });
    it('should reset', function () {
      board.score().should.eql(0)
    });
  });
});
