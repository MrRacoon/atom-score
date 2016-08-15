'use babel'

import * as features from '../../lib'

const test = f => {
  describe('The entry point for ' + f, function () {
    it('should provide constants', function () {
      expect(features[f].constants).toBeDefined()
    })
    it('should provide types', function () {
      expect(features[f].types).toBeDefined()
    })
    it('should provide actions', function () {
      expect(features[f].actions).toBeDefined()
    })
    it('should provide a reducer', function () {
      expect(features[f].reducer).toBeDefined()
    })
  })
}

var feature

for (f in features.default) {
  test(f)
}
