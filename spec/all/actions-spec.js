'use babel'

import * as features from '../../lib'

const sut = features.default

var feature, action

const test = (feature, action) => {
  describe(`Actions for ${feature}`, function () {
    describe(action, function () {
      it('should be a function', function () {
        expect(typeof sut[feature].actions[action]).toEqual('function')
      })
    })
  })
}

for (feature in sut) {
  for (action in sut[feature].actions) {
    test(feature, action)
  }
}
