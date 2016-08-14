'use babel';

import { addPoints } from './actions'

class Reinforcement {
  constructor(name, desc, actions, enabled = true, criteria = x => false, notify = false) {
    Object.assign(this, { name, desc, actions, enabled, criteria, notify })
  }
}

export default class Reinforcements {
  constructor (activated) {
    this.activated = []
  }

  serialize () {
    return this.activated
  }

  check (state) {
    // Get all of the currently active stimuli
    const current = reinforcements.filter(s => s.enabled && s.criteria(state))

    // Identify the stimuli that is newer than previous
    const newer = current
      .filter(s => this.activated.indexOf(s)!== -1)

    // Save the currently active stimuli
    this.activated = current

    // Return the actions of the newer stimuli
    return newer
  }
}

const reinforcements = [
  //
  // Commands
  //
  new Reinforcement (
    'You\'re moving!',
    'Use use 10 commands',
    [ addPoints(-1)],
    true,
    (state) => { state.count > 10 }
  ),
  //
  // score
  //
  new Reinforcement (
    'Still in the womb',
    'attain a score of 10',
    [ addPoints(1) ],
  ),
  new Reinforcement (
    'I\'m sorry, was that a word?',
    'attain a score of 100',
    [ addPoints(10) ],
  ),
  new Reinforcement (
    'Woh, you can talk!',
    'attain a score of 500',
    [ addPoints(50) ],
  ),
  new Reinforcement (
    'Go on...',
    'attain a score of 1000',
    [ addPoints(100) ],
  ),
  new Reinforcement (
    'Go on...',
    'attain a score of 2000',
    [ addPoints(500) ],
  ),
  //
  // Key Combo
  //
  new Reinforcement (
    'Primitive Movement',
    'Using too much `hjkl`',
    [ addPoints(-1) ],
  ),
  //
  // APM
  //
  new Reinforcement (
    'Combo',
    'Attain an apm of 50',
    [ addPoints(5) ],
    false,
    (state) => state.apm === 50
  ),
  new Reinforcement (
    'Good Combo',
    'Attain an apm of 100',
    [ addPoints(10) ] ,
    false,
    (state) => state.apm === 100
  ),
  new Reinforcement (
    'Great Combo',
    'Attain an apm of 150',
    [ addPoints(20) ],
    false,
    (state) => state.apm === 150
  ),
  new Reinforcement (
    'Great Combo',
    'Attain an apm of 200',
    [ addPoints(30) ],
    false,
    (state) => state.apm === 200
  ),
]
