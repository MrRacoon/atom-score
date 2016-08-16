'use babel'

const NAME          = 'count'
const INITIAL_STATE = 0

const INCREMENT = 'counter/increment'
const DECREMENT = 'counter/decrement'
const SET       = 'counter/set'

const increment = amount => ({
  type: INCREMENT,
  amount
})

const decrement = amount => ({
  type: DECREMENT,
  amount
})

const set = amount => ({
  type: SET,
  amount
})

function reducer (state, action) {
  state = state || INITIAL_STATE
  switch (action.type) {
  case INCREMENT : return Object.assign({}, state, {
    [NAME]: state[NAME] + action.amount
  })
  case DECREMENT : return Object.assign({}, state, {
    [NAME]: state[NAME] - action.amount
  })
  case set : return Object.assign({}, state, {
    [NAME]: action.amount
  })
  default        : return state
  }
}

const types     = { INCREMENT, DECREMENT, SET }
const constants = { NAME, INITIAL_STATE }
const actions   = { increment, decrement, set }
export default { types, constants, actions, reducer }
