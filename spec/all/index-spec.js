'use babel'

import * as features from '../../lib'

describe('The entry point for the feature', function () {
  for (feature in features.default) {
    it(feature + ' should provide constants', function () {
      expect(features[feature].constants).toBeDefined()
    })
    it(feature + ' should provide types', function () {
      expect(features[feature].types).toBeDefined()
    })
    it(feature + ' should provide actions', function () {
      expect(features[feature].actions).toBeDefined()
    })
    it(feature + ' should provide a reducer', function () {
      expect(features[feature].reducer).toBeDefined()
    })
  }
})
