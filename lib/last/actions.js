'use babel'

import { SET, RESET } from './actionTypes'

export const set = stimulus => ({
  type: SET,
  stimulus
})

export const reset = stimulus => ({
  type: RESET
})
