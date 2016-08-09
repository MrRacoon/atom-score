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
    });
    describe('using no argument', function () {
      beforeEach(function () {
        sut = new AtomScoreCommandQueue([ARBITRARY])
        console.log(sut)
      });
      it('should have an empty queue', function () {
        expect(sut.queue.length).toEqual(1)
      });
    });
  });
  describe('After initialization', function () {
    beforeEach(function () {
      sut = new AtomScoreCommandQueue()
      fakeEvent = new Rule('j', 'vim-mode:move-down', -1)
    });
    describe('when adding an event', function () {
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
    });
  });
});
