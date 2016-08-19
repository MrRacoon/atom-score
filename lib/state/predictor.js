'use babel'

import Immutable from 'immutable'

const LEARN = 'predictor/learn'

const learn = stimulus => ({
  type: LEARN,
  stimulus
})

constkreducer = (state, action) => {
  state = state || Immutable.Map()
  switch (action.type) {
    case LEARN:
      let current, last, prior
    default: return state
  }
}
