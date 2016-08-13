'use babel';

import t from './actionTypes'

export add      => points => ({ type: t.ADD, points })
export subtract => points => ({ type: t.SUBTRACT, points })
export set      => points => ({ type: t.SET, points })
export reset    => points => ({ type: t.RESET, points })
