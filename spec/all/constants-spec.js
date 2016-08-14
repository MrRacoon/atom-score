'use babel'

import * as features from '../../lib'

const sut = features.default

var feature

for (feature in sut) {
  describe('constants for ' + feature, function () {
    it('should include NAME', function () {
      expect(sut[feature].constants.NAME).toBeDefined()
    })
    it('should include NAME', function () {
      expect(sut[feature].constants.INITIAL_STATE).toBeDefined()
    })
  })
}
