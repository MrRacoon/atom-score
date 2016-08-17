'use babel'

import Counter from '../../lib/state/counter'

import { should } from 'chai'
should()

describe('The counter', function () {

  describe('constants', function () {
    it('should exist', function () {
      expect(Counter.constants).toBeDefined()
    })
    describe('NAME', function () {
      it('should exist', function () {
        expect(Counter.constants.NAME).toBeDefined()
        Counter.constants.NAME.should.eql('count')
      })
    })
    describe('INITIAL_STATE', function () {
      it('should exist', function () {
        expect(Counter.constants.INITIAL_STATE).toBeDefined()
        Counter.constants.INITIAL_STATE.should.eql(0)
      })
    })
  })

  describe('types', function () {
    it('should exist', function () {
      expect(Counter.types).toBeDefined()
    })
    describe('should include', function () {
      it('INCREMENT', function () {
        expect(Counter.types.INCREMENT).toBeDefined()
        Counter.types.INCREMENT.should.eql('counter/increment')
      })
      it('DECREMENT', function () {
        expect(Counter.types.DECREMENT).toBeDefined()
        Counter.types.DECREMENT.should.eql('counter/decrement')
      })
      it('SET', function () {
        expect(Counter.types.SET).toBeDefined()
        Counter.types.SET.should.eql('counter/set')
      })
    })
  })

  describe('actions', function () {
    it('should exist', function () {
      expect(Counter.actions).toBeDefined()
    })
    describe('increment', function () {
      it('should exist', function () {
        expect(Counter.actions.increment).toBeDefined()
      })
      it('should return the correct message', function () {
        Counter.actions.increment().should.eql({
          type   : Counter.types.INCREMENT
        })
      })
    })
    describe('decrement', function () {
      it('should exist', function () {
        expect(Counter.actions.decrement).toBeDefined()
      })
      it('should return the correct message', function () {
        Counter.actions.decrement(1).should.eql({
          type   : Counter.types.DECREMENT
        })
      })
    })
    describe('set', function () {
      it('should exist', function () {
        expect(Counter.actions.set).toBeDefined()
      })
      it('should return the correct message', function () {
        Counter.actions.set(1).should.eql({
          type   : Counter.types.SET,
          amount : 1
        })
      })
    })
  })

  describe('reducer', function () {
    it('should exist', function () {
      expect(Counter.reducer).toBeDefined()
    })
    describe('on INIT', function () {
      it('should properly initialize', function () {
        Counter.reducer({}, {type: '@@redux/init'}).should.eql({
          [Counter.constants.NAME]: Counter.constants.INITIAL_STATE
        })
      })
    })
    describe('when given an increment message', function () {
      it('should increment the amount to the counter property of the state', function () {
        Counter.reducer({}, Counter.actions.increment()).should.eql({
          [Counter.constants.NAME]: Counter.constants.INITIAL_STATE + 1
        })
      })
    })
    describe('when given a decrement message', function () {
      it('should decrement the amount to the counter property of the state', function () {
        var amount = 1
        Counter.reducer({}, Counter.actions.decrement(amount)).should.eql({
          [Counter.constants.NAME]: Counter.constants.INITIAL_STATE - amount
        })
      })
    })
    describe('when given a set message', function () {
      it('should set the amount to the counter property of the state', function () {
        var amount = 1337
        Counter.reducer({}, Counter.actions.set(amount)).should.eql({
          [Counter.constants.NAME]: amount
        })
      })
    })
  })
})
