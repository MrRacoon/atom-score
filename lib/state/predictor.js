'use babel'
import Immutable from 'immutable'

const NAME          = 'predictor'
const INITIAL_STATE = Immutable.Map()

const LEARN = 'predictor/learn'

const learn = stimulus => ({
  type: LEARN,
  stimulus
})

const reducer = (state, action) => {
  state.predictor = state.predictor || INITIAL_STATE
  switch (action.type) {
    case LEARN:
      state.predictor = updateMap(state.predictor, state.recent.toJS())
      return state
    default: return state
  }
}

const updateMap = (mapp, [cur, last, prior, ...rest]) => {
  if (!last) { return }
  //return mapp.update(prior.combo, Immutable.Map(), m => {
  return mapp.update(last.combo, Immutable.Map(), n => {
    return n.update(cur.combo, 0, n => n+1)
  })
  //})
}


const constants = { NAME, INITIAL_STATE }
const types     = { LEARN }
const actions   = { learn }
export default { constants, types, actions, reducer }
