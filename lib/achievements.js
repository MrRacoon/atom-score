'use babel';

import { addPoints } from './actions'

class Stimulous {
  constructor(name, desc, actions, enabled = true, criteria = x => false, notify = false) {
    Object.assign(this, { name, desc, actions, enabled, criteria, notify })
  }
}

export default class Stimuli {
  constructor (activated) {
    this.activated = []
  }

  serialize () {
    return this.activated
  }

  check (state) {
    // Get all of the currently active stimuli
    const current = stimuli.filter(s => s.enabled && s.criteria(state))

    // Identify the stimuli that is newer than previous
    const newer = current
      .filter(s => this.activated.indexOf(s)!== -1)

    // Save the currently active stimuli
    this.activated = current

    // Return the actions of the newer stimuli
    return newer
  }
}

const stimuli = [
  //
  // score
  //
  new Stimulous (
    'Still in the womb',
    'attain a score of 10',
    [ addPoints(1) ],
  ),
  new Stimulous (
    'I\'m sorry, was that a word?',
    'attain a score of 100',
    [ addPoints(10) ],
  ),
  new Stimulous (
    'Woh, you can talk!',
    'attain a score of 500',
    [ addPoints(50) ],
  ),
  new Stimulous (
    'Go on...',
    'attain a score of 1000',
    [ addPoints(100) ],
  ),
  new Stimulous (
    'Go on...',
    'attain a score of 2000',
    [ addPoints(500) ],
  ),
  //
  // Key Combo
  //
  new Stimulous (
    'Primitive Movement',
    'Using too much `hjkl`',
    [ addPoints(-1) ],
  ),
  //
  // APM
  //
  new Stimulous (
    'Combo',
    'Attain an apm of 50',
    [ addPoints(5) ],
    false,
    (state) => state.apm === 50
  ),
  new Stimulous (
    'Good Combo',
    'Attain an apm of 100',
    [ addPoints(10) ] ,
    false,
    (state) => state.apm === 100
  ),
  new Stimulous (
    'Great Combo',
    'Attain an apm of 150',
    [ addPoints(20) ],
    false,
    (state) => state.apm === 150
  ),
  new Stimulous (
    'Great Combo',
    'Attain an apm of 200',
    [ addPoints(30) ],
    false,
    (state) => state.apm === 200
  ),
]
