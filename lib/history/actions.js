'use babel'

import { INCREMENT } from './actionTypes'

export const increment = command => ({
  type: INCREMENT,
  command
})
