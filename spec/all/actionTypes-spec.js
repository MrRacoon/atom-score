'use babel'

import * as features from '../../lib'

const sut = features.default

var seenTypes = []

const test = (f,t) => {
  describe(`Action types for ${f}`, function () {
    describe(t, function () {
      it('should be a string', function () {
        expect(sut[f].types[t]).toBeDefined()
        expect(typeof sut[f].types[t]).toEqual('string')
      })
      it('should have a unique value', function () {
        expect(seenTypes.indexOf(sut[f].types[t])).toEqual(-1)
        seenTypes.push(sut[f].types[t])
      })
    })
  })
}


for (f in sut) {
  for (t in sut[f].types) {
    test(f, t)
  }
}
