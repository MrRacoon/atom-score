'use babel'

import stimuli from '../../lib/behavior/stimuli'

describe('Stimuli', function () {
  it('should be a list', function () {
    expect(typeof stimuli).toEqual('object')
    expect(stimuli instanceof Array).toBeTruthy()
  })
  it('should all have an id', function () {
    stimuli.forEach(s => expect(s.id).toBeDefined())
  })
  it('should all have a unique id', function () {
    const ids = stimuli.map(s => s.id)
    ids.forEach(id => expect(ids.indexOf(id)).toEqual(ids.lastIndexOf(id)))
  })
})
