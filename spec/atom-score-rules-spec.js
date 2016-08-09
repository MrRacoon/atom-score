'use babel';

import { Rule, rules, sample } from '../lib/atom-score-rules'

var fakeRule, rule

describe('The rule module', function () {
  beforeEach(function () {
    rule = sample()
  });
  describe('properties', function () {
    it('should have points', function () {
      expect(rule.points).toBeDefined()
    });
    it('should have command', function () {
      expect(rule.command).toBeDefined()
    });
    it('should have key', function () {
      expect(rule.key).toBeDefined()
    });
  });
  describe('resetTime', function () {
    it('should reset the date of the event', function () {
      spyOn(Date, 'now').andCallFake(() => Math.random())
      const r1 = rule.time
      rule.resetTime()
      const r2 = rule.time
      expect(r1).toNotEqual(r2)
    });
  });
  describe('timeStamped', function () {
    it('should return a new instance of the rule with a new time', function () {
      spyOn(Date, 'now').andCallFake(() => Math.random())
      const r1 = rule.timeStamped()
      const r2 = rule.timeStamped()
      expect(r1).toNotEqual(r2)
    });
  });
  describe('the sample function', function () {
    it('should return a rule from the set of rules', function () {
      const r = sample()
      expect(rules).toContain(r)
    });
    it('should be relatively random', function () {
      expect([sample(), sample()]).toNotEqual([sample(), sample()])
    });
  });
});
