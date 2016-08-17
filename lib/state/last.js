'use babel'

const NAME = 'last'
const INITIAL_STATE = {}

const SET = 'last/set'

const set = stimulus => ({
  type: SET,
  stimulus
})

function reducer (state, action) {
  state.last = state.last || INITIAL_STATE
  if (action.type === SET) {
    return Object.assign({}, state, { [NAME]: action.stimulus })
  }
  return state
}

const constants = { NAME, INITIAL_STATE }
const types     = { SET }
const actions   = { set }
export default { constants, types, actions, reducer };
