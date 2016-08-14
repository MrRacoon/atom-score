'use babel'

import * as t from './actionTypes'

export const increment = amount => ({
  type: t.INCREMENT,
  amount
})
