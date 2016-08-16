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

export function reducer (state, action) {
  state = state || INITIAL_STATE
  switch (action.typek) {
  case INCREMENT : return state.count + action.amount
  case DECREMENT : return state.count - action.amount
  case SET       : return action.amount
  default        : return state
  }
}

export const constants = { NAME, INITIAL_STATE }
export const actions   = { increment, decrement, set }
export default { constants, actions, reducer }
