'use babel'

import * as features from '../../lib'

const sut = features.default

for (f in features.default) {
  describe(`Actions for ${f}`, function () {
    for (a in sut[f].actions) {
      describe(a, function () {
        it('should be a function', function () {
          expect(typeof sut[f].actions[a]).toEqual('function')
        })
      })
    }
  })
}
