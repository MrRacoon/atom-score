'use babel';

import AtomScoreBoard from '../lib/atom-score-board'
import AtomScoreHistoryMap from '../lib/atom-score-history-map'
import AtomScoreCommandQueue from '../lib/atom-score-command-queue'
import { Rule } from '../lib/atom-score-rules'

let sut, fakeEvent, fakeHistory, fakeCommandQ;

describe('A score keeper', function () {
  beforeEach(function () {
    sut          = new AtomScoreBoard()
    fakeEvent    = new Rule('j', 'vim-mode:move-down', 2)
    fakeHistory  = new AtomScoreHistoryMap()
    fakeCommandQ = new AtomScoreCommandQueue()
  });
  describe('while adding an event', function () {
    it('should increase the score', function () {
      expect(sut.score()).toEqual(0)
      sut.addEvent(fakeEvent)
      expect(sut.score()).toEqual(fakeEvent.points)
    });
    it('should increase the apm', function () {
      expect(sut.apm()).toEqual(0)
      sut.addEvent(fakeEvent)
      expect(sut.apm()).toEqual(4)
    });
    it('should increase the spm', function () {
      expect(sut.spm()).toEqual(0)
      sut.addEvent(fakeEvent)
      expect(sut.spm()).toEqual(fakeEvent.points)
    });
    it('should set the latest event', function () {
      expect(sut.latest()).toEqual({})
      sut.addEvent(fakeEvent)
      expect(sut.latest()).toEqual(fakeEvent)
    });
    it('should add an entry to the history', function () {
      expect(sut.history()).toEqual({})
      sut.addEvent(fakeEvent)
      fakeHistory.add(fakeEvent)
      expect(sut.history()).toEqual(fakeHistory.serialize())
    });
    it('should add an entry to the command queue', function () {
      expect(sut.commands()).toEqual([])
      sut.addEvent(fakeEvent)
      fakeCommandQ.add(fakeEvent)
      expect(sut.commands()).toEqual(fakeCommandQ.commands())
    });
    describe('the streak', function () {
      describe('when positive', function () {
        beforeEach(function () {
          sut.addEvent(fakeEvent)
        });
        it('should increase when given another positive event', function () {
          const prev = sut.streak()
          sut.addEvent(fakeEvent)
          expect(sut.streak()).toBeGreaterThan(prev)
        });
        it('should assume the negative value of a negative event', function () {
          const prev = sut.streak()
          fakeEvent.points = -10
          sut.addEvent(fakeEvent)
          expect(sut.streak()).toEqual(-10)
        });
      });
      describe('when negative', function () {
        beforeEach(function () {
          fakeEvent.points = -2
          sut.addEvent(fakeEvent)
        });
        it('should decrease when given another negative event', function () {
          const prev = sut.streak()
          sut.addEvent(fakeEvent)
          expect(sut.streak()).toBeLessThan(prev)
        });
        it('should assume any given poisitive event\'s points', function () {
          const prev = sut.streak()
          fakeEvent.points = 3
          sut.addEvent(fakeEvent)
          expect(sut.streak()).toEqual(fakeEvent.points)
        });
      });
    });
    it('should alter the streak', function () {
      expect(sut.streak()).toEqual(0)
      sut.addEvent(fakeEvent)
      expect(sut.streak()).toEqual(fakeEvent.points)
      sut.addEvent(fakeEvent)
      expect(sut.streak()).toEqual(fakeEvent.points*2)
    });
  });

  describe('after given a single event', function () {
    beforeEach(function () {
      fakeHistory.add(fakeEvent)
      fakeCommandQ.add(fakeEvent)
      sut.addEvent(fakeEvent)
    });
    describe('after calling current()', function () {
      it('should return score', function () {
        expect(sut.score()).toEqual(fakeEvent.points)
      });
      it('should return apm', function () {
        expect(sut.apm()).toEqual(4)
      });
      it('should return spm', function () {
        expect(sut.spm()).toEqual(fakeEvent.points)
      });
      it('should return the latest event', function () {
        expect(sut.latest()).toEqual(fakeEvent)
      });
      it('should return history of command name to various aggregations', function () {
        expect(sut.history()).toEqual(fakeHistory.serialize())
      });
      it('should return commands in a list of command keys', function () {
        expect(sut.commands()).toEqual(fakeCommandQ.commands())
      });
      it('should return the streak counter', function () {
        expect(sut.streak()).toEqual(fakeEvent.points)
      });
    });
  });

  describe('when asked to reset', function () {
    beforeEach(function () {
      sut.reset()
    });
    it('should reset the score', function () {
      expect(sut.score()).toEqual(0)
    });
    it('should reset the apm', function () {
      expect(sut.apm()).toEqual(0)
    });
    it('should reset the spm', function () {
      expect(sut.spm()).toEqual(0)
    });
    it('should reset the command queue', function () {
      expect(sut.commands()).toEqual([])
    });
    it('should reset the history', function () {
      expect(sut.history()).toEqual({})
    });
    it('should reset the streak', function () {

    });
  });

});
