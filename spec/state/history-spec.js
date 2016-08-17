'use babel'

import History from '../../lib/state/history'
import { Map } from 'immutable'

import { should } from 'chai'
should()

describe('The History keeper', function () {

  describe('constants', function () {
    it('should exist', function () {
      expect(History.constants).toBeDefined()
    })
    describe('NAME', function () {
      it('should exist', function () {
        expect(History.constants.NAME).toBeDefined()
        History.constants.NAME.should.eql('history')
      })
    })
    describe('INITIAL_STATE', function () {
      it('should exist', function () {
        expect(History.constants.INITIAL_STATE).toBeDefined()
        History.constants.INITIAL_STATE.should.eql(Map())
      })
    })
  })

  describe('types', function () {
    it('should exist', function () {
      expect(History.types).toBeDefined()
    })
    describe('should include', function () {
      it('INCREMENT', function () {
        expect(History.types.INCREMENT).toBeDefined()
        History.types.INCREMENT.should.eql('history/increment')
      })
    })
  })

  describe('actions', function () {
    it('should exist', function () {
      expect(History.actions).toBeDefined()
    })
    describe('increment', function () {
      it('should exist', function () {
        expect(History.actions.increment).toBeDefined()
      })
      it('should return the correct message', function () {
        const stimulus = { id: 'arb' }
        History.actions.increment(stimulus).should.eql({
          type : History.types.INCREMENT,
          stimulus
        })
      })
    })
  })

  describe('reducer', function () {
    it('should exist', function () {
      expect(History.reducer).toBeDefined()
    })
    describe('on INIT', function () {
      it('should properly initialize', function () {
        History.reducer({}, {type: '@@redux/init'}).should.eql({
          [History.constants.NAME]: History.constants.INITIAL_STATE
        })
      })
    })
    describe('when given an increment message', function () {
      it('should increment the amount to the history property of the state', function () {
        const stimulus = { id : 'arb'}
        var newState = History.reducer({}, History.actions.increment(stimulus))
        newState[History.constants.NAME].get(stimulus.id).should.be.eql(1)
      })
    })
  })
})
