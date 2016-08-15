'use babel'

import * as features from '../../lib'

const sut = features.default

const test = f => {
  describe('constants for ' + f, function () {
    it('should include NAME', function () {
      expect(sut[f].constants.NAME).toBeDefined()
    })
    it('should include NAME', function () {
      expect(sut[f].constants.INITIAL_STATE).toBeDefined()
    })
  })
}

var feature
for (feature in sut) {
  test(feature)
}
