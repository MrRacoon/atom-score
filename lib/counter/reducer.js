'use babel'

import { INCREMENT } from './actionTypes'
import { INITIAL_STATE } from './constants'

export default function reducer (state, action) {
  state = state || INITIAL_STATE
  switch (action.type) {
  case INCREMENT : return state +1
  default        : return state
  }
}
