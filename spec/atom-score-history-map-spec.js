'use babel';

import AtomScoreHistoryMap from '../lib/atom-score-history-map'
import { Rule } from '../lib/atom-score-rules'

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
    var fakeEvent
    beforeEach(function () {
      sut = new AtomScoreHistoryMap()
      fakeEvent = new Rule('j', 'vim-mode:move-up', -1)
    });
    describe('after adding an event', function () {
      beforeEach(function () {
        sut.add(fakeEvent)
      });
      describe('the score for the event', function () {
        it('should change according to the points of the event', function () {
          expect(sut.hist[fakeEvent.command].points).toEqual(fakeEvent.points)
        });
      });
      describe('the points for the event', function () {
        it('should increase by one', function () {
          expect(sut.hist[fakeEvent.command].count).toEqual(1)
        })
      });
      describe('calling score', function () {
        it('should return the cumulative score of the map', function () {
          expect(sut.score()).toEqual(fakeEvent.points)
        });
      });
      describe('calling counts', function () {
        it('should return map of command to counts called', function () {
          const expected = {}
          expected[fakeEvent.command] = 1
          expect(sut.counts()).toEqual(expected)
        });
      });
    });
    describe('after adding multiple events', function () {
      beforeEach(function () {
        sut.add(fakeEvent)
        sut.add(fakeEvent)
        sut.add(fakeEvent)
      });
      describe('the score for the event', function () {
        it('should change according to the points of the event', function () {
          expect(sut.hist[fakeEvent.command].points).toEqual(fakeEvent.points * 3)
        });
      });
      describe('the points for the event', function () {
        it('should increase by one', function () {
          expect(sut.hist[fakeEvent.command].count).toEqual(3)
        })
      });
      describe('calling score', function () {
        it('should return the cumulative score of the map', function () {
          expect(sut.score()).toEqual(fakeEvent.points * 3)
        });
      });
      describe('calling counts', function () {
        it('should return map of command to counts called', function () {
          const expected = {}
          expected[fakeEvent.command] = 3
          expect(sut.counts()).toEqual(expected)
        });
      });
    });
  });
});
