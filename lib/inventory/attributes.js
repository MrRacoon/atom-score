'use babel';

const WEAPON = 'weapon';
const HEAD   = 'head';
const TORSO  = 'torso';
const HANDS  = 'hands';
const LEGS   = 'legs';
const FEET   = 'feet';

export const types = {
  sword      : WEAPON,
  longsword  : WEAPON,
  shortsword : WEAPON,
  axe        : WEAPON,
  mace       : WEAPON,
  bow        : WEAPON,
  hat        : HEAD,
  cap        : HEAD,
  helmet     : HEAD,
  hood       : HEAD,
  beanie     : HEAD,
  shirt      : TORSO,
  jacket     : TORSO,
  vest       : TORSO,
  gloves     : HANDS,
  mittens    : HANDS,
  jeans      : LEGS,
  shorts     : LEGS,
  sweats     : LEGS,
  shoes      : FEET,
  boots      : FEET,
  kicks      : FEET,
  sandals    : FEET
};

export const origins = [
  'bethos',
  'lanwhin',
  'baltimore',
  'gorgon',
  'greyscale',
  'booleana',
  'loremipsumis',
  'fantasmo',
  'flaggor'
];

export const elements = [
  '',
  'fire',
  'ice',
  'lightning',
  'light',
];

export const wearing = [
  'basic',
  'common',
  'prestine',
  'powerful',
  'super',
];
