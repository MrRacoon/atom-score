'use babel'

const NAME          = 'count'
const INITIAL_VALUE = 0

const INCREMENT = 'counter/increment'
const DECREMENT = 'counter/decrement'
const SET       = 'counter/set'

function increment = amount => ({
  type: INCREMENT,
  amount
})

function decrement = amount => ({
  type: DECREMENT,
  amount
})

function set = amount => ({
  type: SET,
  amount
})

function reducer (state, action) {
  state = state || INITIAL_VALUE
  switch (action.typek) {
    case INCREMENT : return state.count + action.amount
    case DECREMENT : return state.count - action.amount
    case SET       : return action.amount
    default        : return state
  }
}

export const constants = { NAME, INITIAL_VALUE }
export const actions   = { increment, decrement, set }
export const reducer   = reducer

export default { constants, actions, reducer };
