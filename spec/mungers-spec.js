'use babel'

import { getScore, getCount } from '../lib/mungers'
import rootReducer            from '../lib/rootReducer'
import { score, counter, history } from '../lib/state'

const add5Points      = score.actions.add(5)
const addHistoryCount = history.actions.increment(5)
const addOneCount     = counter.actions.increment()

var state

beforeEach(function () {
  const stateA = {}
  const stateB = rootReducer(stateA, addOneCount)
  const stateC = rootReducer(stateB, addHistoryCount)
  const stateD = rootReducer(stateC, add5Points)
  state        = stateD
});

describe('mungers to read the state', function () {
  describe('getScore', function () {
    it('should return the score', function () {
      expect(getScore(state)).toEqual(5)
      expect(getScore(rootReducer(state, add5Points))).toEqual(10)
    })
  })
  describe('getCount', function () {
    it('should return the number of command tracked', function () {
      expect(getCount(state)).toEqual(1)
      expect(getCount(rootReducer(state, addOneCount))).toEqual(2)
    })
  })
})
