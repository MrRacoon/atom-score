'use babel'

import Score from '../../lib/state/score'

import { should } from 'chai'
should()

describe('The score tracker', function () {

  describe('constants', function () {
    it('should exist', function () {
      expect(Score.constants).toBeDefined()
    })
    describe('NAME', function () {
      it('should exist', function () {
        expect(Score.constants.NAME).toBeDefined()
        Score.constants.NAME.should.eql('score')
      })
    })
    describe('INITIAL_STATE', function () {
      it('should exist', function () {
        expect(Score.constants.INITIAL_STATE).toBeDefined()
        Score.constants.INITIAL_STATE.should.eql(0)
      })
    })
  })

  describe('types', function () {
    it('should exist', function () {
      expect(Score.types).toBeDefined()
    })
    describe('should include', function () {
      it('ADD', function () {
        expect(Score.types.ADD).toBeDefined()
        Score.types.ADD.should.eql(Score.constants.NAME+'/add')
      })
      it('SUBTRACT', function () {
        expect(Score.types.SUBTRACT).toBeDefined()
        Score.types.SUBTRACT.should.eql(Score.constants.NAME+'/subtract')
      })
      it('SET', function () {
        expect(Score.types.SET).toBeDefined()
        Score.types.SET.should.eql(Score.constants.NAME+'/set')
      })
    })
  })

  describe('actions', function () {
    it('should exist', function () {
      expect(Score.actions).toBeDefined()
    })

    describe('add', function () {
      it('should exist', function () {
        expect(Score.actions.add).toBeDefined()
      })
      it('should return the correct message', function () {
        Score.actions.add(1).should.eql({
          type   : Score.types.ADD,
          amount : 1
        })
      })
    })
    describe('subtract', function () {
      it('should exist', function () {
        expect(Score.actions.subtract).toBeDefined()
      })
      it('should return the correct message', function () {
        Score.actions.subtract(1).should.eql({
          type   : Score.types.SUBTRACT,
          amount : 1
        })
      })
    })
    describe('set', function () {
      it('should exist', function () {
        expect(Score.actions.set).toBeDefined()
      })
      it('should return the correct message', function () {
        Score.actions.set(1).should.eql({
          type   : Score.types.SET,
          amount : 1
        })
      })
    })
  })

  describe('reducer', function () {
    it('should exist', function () {
      expect(Score.reducer).toBeDefined()
    })
    describe('when given an add message', function () {
      it('should add the amount to the score property of the state', function () {
        var amount = 1
        Score.reducer({}, Score.actions.add(amount)).should.eql({
          [Score.constants.NAME]: Score.constants.INITIAL_STATE + amount
        })
      })
    })
    describe('when given a subtract message', function () {
      it('should subtract the amount to the score property of the state', function () {
        var amount = 1
        Score.reducer({}, Score.actions.subtract(amount)).should.eql({
          [Score.constants.NAME]: Score.constants.INITIAL_STATE - amount
        })
      })
    })
    describe('when given a set message', function () {
      it('should set the amount to the score property of the state', function () {
        var amount = 1
        Score.reducer({}, Score.actions.set(amount)).should.eql({
          [Score.constants.NAME]: amount
        })
      })
    })
  })
})
