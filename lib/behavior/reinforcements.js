'use babel';

import { score } from '../state';

export default class Reinforcements {
  constructor (activated) { this.activated = activated || []; }

  serialize () { return this.activated; }

  check (state) {
    // Get all of the currently active stimuli
    const current = reinforcements.filter(r => r.isActive(state));
    // Identify the stimuli that is newer than previous
    const newer = current.filter(r => this.activated.indexOf(r) === -1);
    // Save the currently active stimuli
    this.activated = current;
    // Return the actions of the newer stimuli
    return newer;
  }
}

export class Reinforcement {
  constructor(config = {}) {
    this.name     = config.name     || '';
    this.desc     = config.desc     || '';
    this.actions  = config.actions  || [];
    this.enabled  = config.enabled  || false;
    this.criteria = config.criteria || (() => false);
    this.notify   = config.notify   || false;
  }

  isActive (state) {
    return this.enabled && this.criteria(state);
  }
}

const addPoints = points => points;

export const reinforcements = [
  //
  // Commands
  //
  new Reinforcement ({
    name     : 'You\'re moving!',
    desc     : 'Use 10 commands',
    actions  : [ addPoints(10) ],
    enabled  : true,
    criteria : (state) => state.count >= 10
  }),
  new Reinforcement ({
    name     : 'we\'re rolling',
    desc     : 'Use 20 commands',
    actions  : [ addPoints(20) ],
    enabled  : true,
    criteria : (state) => state.count >= 20
  }),
  //
  // score
  //
  new Reinforcement ({
    name: 'Still in the womb',
    desc: 'attain a score of 10',
    actions: [ addPoints(1) ],
    // enabled:
    // criteria:
  }),
  new Reinforcement ({
    name: 'I\'m sorry, was that a word?',
    desc: 'attain a score of 100',
    actions: [ addPoints(10) ],
    // enabled:
    // criteria:
  }),
  new Reinforcement ({
    name: 'Woh, you can talk!',
    desc: 'attain a score of 500',
    actions: [ addPoints(50) ],
    // enabled:
    // criteria:
  }),
  new Reinforcement ({
    name: 'Go on...',
    desc: 'attain a score of 1000',
    actions: [ addPoints(100) ],
    // enabled:
    // criteria:
  }),
  new Reinforcement ({
    name: '...uh huh...',
    desc: 'attain a score of 2000',
    actions: [ addPoints(500) ],
    // enabled:
    // criteria:
  }),
  new Reinforcement ({
    name: 'Okay buddy I can\'t be here all night',
    desc: 'attain a score of 2000',
    actions: [ addPoints(500) ],
    // enabled:
    // criteria:
  }),
  //
  // Key Combo
  //
  new Reinforcement ({
    name: 'Primitive Movement',
    desc: 'Using too much `hjkl`',
    actions: [ addPoints(-1) ],
    // enabled:
    // criteria:
  }),
  //
  // APM
  //
  new Reinforcement ({
    name: 'Combo',
    desc: 'Attain an apm of 50',
    actions: [ addPoints(5) ],
    enabled: false,
    criteria: (state) => state.apm === 50
  }),
  new Reinforcement ({
    name: 'Good Combo',
    desc: 'Attain an apm of 100',
    actions: [ addPoints(10) ] ,
    enabled: false,
    criteria: (state) => state.apm === 100
  }),
  new Reinforcement ({
    name: 'Great Combo',
    desc: 'Attain an apm of 150',
    actions: [ addPoints(20) ],
    enabled: false,
    criteria: (state) => state.apm === 150
  }),
  new Reinforcement ({
    name: 'Great Combo',
    desc: 'Attain an apm of 200',
    actions: [ addPoints(30) ],
    enabled: false,
    criteria: (state) => state.apm === 200
  }),
];
