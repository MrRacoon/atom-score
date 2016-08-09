'use babel'

import AtomScoreCommandQueue from '../lib/atom-score-command-queue'
import { Rule } from '../lib/atom-score-rules'

const ARBITRARY = 'deadbeef'

describe('A queue for keeping track of commands', function () {
  var sut, fakeEvent
  describe('on initialization', function () {
    describe('using no argument', function () {
      beforeEach(function () {
        sut = new AtomScoreCommandQueue()
        console.log(sut)
      });
      it('should have an empty queue', function () {
        expect(sut.queue.length).toEqual(0)
      });
      it('should serialize into the initial value', function () {
        expect(sut.serialize()).toEqual([])
      });
    });
    describe('using an argument', function () {
      beforeEach(function () {
        sut = new AtomScoreCommandQueue([ARBITRARY])
        console.log(sut)
      });
      it('should have an empty queue', function () {
        expect(sut.queue.length).toEqual(1)
      });
      it('should serialize into the initial value', function () {
        expect(sut.serialize()).toEqual([ARBITRARY])
      });
    });
  });
  describe('After initialization', function () {
    beforeEach(function () {
      sut = new AtomScoreCommandQueue()
      fakeEvent = new Rule('j', 'vim-mode:move-down', -1)
    });
    describe('after adding an event', function () {
      beforeEach(function () {
        sut.add(fakeEvent)
      });
      describe('the queue', function () {
        it('should not be empty', function () {
          expect(sut.queue.length).toEqual(1)
        });
        it('should contain the event passed in', function () {
          expect(sut.queue).toEqual([fakeEvent])
        });
      });
      describe('when asking about the score', function () {
        it('should return the aggregation of all scores in the queue', function () {
          expect(sut.score()).toEqual(fakeEvent.points)
        });
      });
      describe('when asking about the apm', function () {
        it('should return the length of the queue times 4', function () {
          expect(sut.apm()).toEqual(sut.queue.length * 4)
        });
      });
      describe('when asking about the commands issued', function () {
        it('should return a list of strings equal to the amount of commands issued', function () {
          expect(sut.commands().length).toEqual(sut.queue.length)
        });
      });
    });
    describe('after adding multiple events', function () {
      beforeEach(function () {
        sut.add(fakeEvent)
        sut.add(fakeEvent)
        sut.add(fakeEvent)
      });
      describe('the queue', function () {
        it('should not be empty', function () {
          expect(sut.queue.length).toEqual(3)
        });
        it('should contain the event passed in', function () {
          expect(sut.queue).toEqual([fakeEvent, fakeEvent, fakeEvent])
        });
      });
      describe('when asking about the score', function () {
        it('should return the aggregation of all scores in the queue', function () {
          expect(sut.score()).toEqual(fakeEvent.points * 3)
        });
      });
      describe('when asking about the apm', function () {
        it('should return the length of the queue times 4', function () {
          expect(sut.apm()).toEqual(sut.queue.length * 4)
        });
      });
      describe('when asking about the commands issued', function () {
        it('should return a list of strings equal to the amount of commands issued', function () {
          expect(sut.commands().length).toEqual(sut.queue.length)
        });
      });
    });
  });
});
