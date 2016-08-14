'use babel'

import { INITIAL_STATE } from './constants'
import { INIT, SET, RESET } from './actionTypes'

export default function reducer (state, action) {
  state = state || INITIAL_STATE
  switch (action.type) {
    case SET   : return action.stimulus
    case RESET : return INITIAL_STATE
    default    : return state
  }
};
