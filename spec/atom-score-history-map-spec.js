'use babel';

import AtomScoreHistoryMap from '../lib/atom-score-history-map'

const ARBITRARY = 'deadbeef'

describe('A map for keeping track of history information', function () {
  describe('during initialization', function () {
    describe('when given an initial state', function () {
      beforeEach(function () {
        sut = new AtomScoreHistoryMap({state: ARBITRARY})
      });
      it('should consume the values for the internal hist structure', function () {
        expect(sut.hist).toEqual({state: ARBITRARY})
      });
      it('should return that stat on serialization', function () {
        expect(sut.serialize()).toEqual({state: ARBITRARY})
      });
    });
    describe('when not given an initial state', function () {
      beforeEach(function () {
        sut = new AtomScoreHistoryMap()
      });
      it('should default to an empty map for the internal hist structure', function () {
        expect(sut.hist).toEqual({})
      });
      it('should return that stat on serialization', function () {
        expect(sut.serialize()).toEqual({})
      });
    });
  });
  describe('after initialization', function () {
    describe('description', function () {

    });
  });
});
