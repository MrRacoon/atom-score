'use babel'

import * as features from '../../lib'

var feature

for (feature in features.default) {
  describe('The entry point for ' + feature, function () {
    it('should provide constants', function () {
      expect(features[feature].constants).toBeDefined()
    })
    it('should provide types', function () {
      expect(features[feature].types).toBeDefined()
    })
    it('should provide actions', function () {
      expect(features[feature].actions).toBeDefined()
    })
    it('should provide a reducer', function () {
      expect(features[feature].reducer).toBeDefined()
    })
  })
}
