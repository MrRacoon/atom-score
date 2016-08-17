'use babel'

import { getScore, getCount } from '../lib/mungers'
import rootReducer            from '../lib/rootReducer'
import { score, counter, history } from '../lib/state'


const add5Points = score.actions.add(5)
const addHistoryCount = history.actions.increment(5)
const addOneCount = counter.actions.increment(5)

beforeEach(function () {

});


describe('mungers to read the state', function () {
  describe('getScore', function () {
    it('should return the score', function () {
      expect
    })
  })
})
