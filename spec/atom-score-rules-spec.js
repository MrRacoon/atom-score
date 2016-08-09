'use babel';

import { Rule } from '../lib/atom-score-rules'

describe('The rule class', function () {
  var fakeRule;
  beforeEach(function () {
    fakeRule = {
      command: 'vim-mode:yank',
      key: 'y',
      points: 10,
      date: new Date()
    }
    rule = new Rule(fakeRule.key, fakeRule.command, fakeRule.points)
  });
  describe('properties', function () {
    it('should have points', function () {
      expect(rule.points).toEqual(fakeRule.points)
    });
    it('should have command', function () {
      expect(rule.command).toEqual(fakeRule.command)
    });
    it('should have key', function () {
      expect(rule.key).toEqual(fakeRule.key)
    });
  });
  describe('methods', function () {
    describe('resetTime', function () {
      it('should reset the date of the event', function () {
        rule.resetTime()
        expect(rule.time).toNotEqual(fakeRule.time)
      });
    });
  });
});
