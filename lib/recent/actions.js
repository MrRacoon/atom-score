'use babel'

import { ADD, SET, RESET } from './actionTypes.js'

export const add = stimulus => ({
  type: ADD,
  stimulus
})

export const set = state => ({
  type: SET,
  state
})

export const reset = () => ({
  type: RESET
})
