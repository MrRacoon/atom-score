'use babel'

import * as features from '../../lib'

const sut = features.default

const test = f => {
  describe('The reducer for ' + f, function () {
    it('should return an initial state on init', function () {
      expect(sut[f].reducer(undefined, { type: '@@redux/init' })).toBeDefined()
    })
  })
}


var feature
for (feature in sut) {
  test(feature)
}
