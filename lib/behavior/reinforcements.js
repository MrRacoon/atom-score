'use babel';

import { F } from 'ramda';

const addPoints = points => points;

const reinforcement = ({ name = '', desc = '', actions = [], enabled = false, criteria = F, notify = false }) => ({
  name,
  desc,
  actions,
  enabled,
  criteria,
  notify,
});

export default [
  //
  // Commands
  //
  reinforcement ({
    name     : 'You\'re moving!',
    desc     : 'Use 10 commands',
    actions  : [ addPoints(10) ],
    enabled  : true,
    criteria : (state) => state.count >= 10
  }),
  reinforcement ({
    name     : 'we\'re rolling',
    desc     : 'Use 20 commands',
    actions  : [ addPoints(20) ],
    enabled  : true,
    criteria : (state) => state.count >= 20
  }),
  //
  // score
  //
  reinforcement ({
    name: 'Still in the womb',
    desc: 'attain a score of 10',
    actions: [ addPoints(1) ],
  }),
  reinforcement ({
    name: 'I\'m sorry, was that a word?',
    desc: 'attain a score of 100',
    actions: [ addPoints(10) ],
  }),
  reinforcement ({
    name: 'Woh, you can talk!',
    desc: 'attain a score of 500',
    actions: [ addPoints(50) ],
  }),
  reinforcement ({
    name: 'Go on...',
    desc: 'attain a score of 1000',
    actions: [ addPoints(100) ],
  }),
  reinforcement ({
    name: '...uh huh...',
    desc: 'attain a score of 2000',
    actions: [ addPoints(500) ],
  }),
  reinforcement ({
    name: 'Okay buddy I can\'t be here all night',
    desc: 'attain a score of 2000',
    actions: [ addPoints(500) ],
  }),
  //
  // Key Combo
  //
  reinforcement ({
    name: 'Primitive Movement',
    desc: 'Using too much `hjkl`',
    actions: [ addPoints(-1) ],
  }),
  //
  // APM
  //
  reinforcement ({
    name: 'Combo',
    desc: 'Attain an apm of 50',
    actions: [ addPoints(5) ],
    enabled: false,
    criteria: (state) => state.apm === 50
  }),
  reinforcement ({
    name: 'Good Combo',
    desc: 'Attain an apm of 100',
    actions: [ addPoints(10) ] ,
    enabled: false,
    criteria: (state) => state.apm === 100
  }),
  reinforcement ({
    name: 'Great Combo',
    desc: 'Attain an apm of 150',
    actions: [ addPoints(20) ],
    enabled: false,
    criteria: (state) => state.apm === 150
  }),
  reinforcement ({
    name: 'Great Combo',
    desc: 'Attain an apm of 200',
    actions: [ addPoints(30) ],
    enabled: false,
    criteria: (state) => state.apm === 200
  }),
];
