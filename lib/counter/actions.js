'use babel'

import * as t from './actionTypes'

export const increment = amount => ({
  type: t.INCREMENT,
  amount
})

export const set = amount => ({
  type: t.SET,
  amount
})

export const reset = () => ({
  type: t.SET,
  amount: 0
})
