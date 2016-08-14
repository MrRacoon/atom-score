'use babel'

import * as t from './actionTypes'

export const add      = points => ({ type: t.ADD, points })
export const subtract = points => ({ type: t.SUBTRACT, points })
export const set      = points => ({ type: t.SET, points })
export const reset    = points => ({ type: t.RESET, points })
