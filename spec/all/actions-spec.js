'use babel'

import * as features from '../../lib'

const sut = features.default

var feature, action

for (feature in features.default) {
  describe(`Actions for ${feature}`, function () {
    for (action in sut[feature].actions) {
      describe(action, function () {
        it('should be a function', function () {
          expect(typeof sut[feature].actions[action]).toEqual('function')
        })
      })
    }
  })
}
