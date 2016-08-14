'use babel'

import * as features from '../../lib'

const sut = features.default

var feature
for (feature in sut) {
  describe('The reducer for ' + feature, function () {
    it('should return an initial state on init', function () {
      expect(sut[feature].reducer(undefined, { type: '@@redux/init' })).toBeDefined()
    })
  })
}
