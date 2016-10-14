'use babel';

const WEAPON = 'weapon';
const HEAD   = 'head';
const TORSO  = 'torso';
const HANDS  = 'hands';
const LEGS   = 'legs';
const FEET   = 'feet';

export const types = {
  axe                : WEAPON,
  bostaff            : WEAPON,
  bow                : WEAPON,
  chainsaw           : WEAPON,
  cleaver            : WEAPON,
  crossbow           : WEAPON,
  dagger             : WEAPON,
  garrote            : WEAPON,
  katana             : WEAPON,
  longsword          : WEAPON,
  mace               : WEAPON,
  musket             : WEAPON,
  pike               : WEAPON,
  plunger            : WEAPON,
  saber              : WEAPON,
  schwartsaber       : WEAPON,
  scythe             : WEAPON,
  shortsword         : WEAPON,
  spatula            : WEAPON,
  spear              : WEAPON,
  staff              : WEAPON,
  sword              : WEAPON,
  symatar            : WEAPON,
  wand               : WEAPON,
  whip               : WEAPON,

  hat                : HEAD,
  cap                : HEAD,
  helmet             : HEAD,
  hood               : HEAD,
  beanie             : HEAD,
  googles            : HEAD,
  shades             : HEAD,
  monocle            : HEAD,
  balaclava          : HEAD,
  'gas mask'         : HEAD,
  'hockey mask'      : HEAD,
  'guy fawkes mask'  : HEAD,
  'wizard hat'       : HEAD,
  'boone cap'        : HEAD,
  boonie             : HEAD,

  shirt              : TORSO,
  hoodie             : TORSO,
  'bomber jacket'    : TORSO,
  'mithril '         : TORSO,
  'bullet proof vest': TORSO,
  jacket             : TORSO,
  vest               : TORSO,

  gloves             : HANDS,
  'brass knuckels'   : HANDS,
  bracelet           : HANDS,
  mittens            : HANDS,
  ring               : HANDS,
  watch              : HANDS,
  phone              : HANDS,

  jeans              : LEGS,
  shorts             : LEGS,
  sweats             : LEGS,
  dresspants         : LEGS,

  shoes              : FEET,
  clogs              : FEET,
  mockasins          : FEET,
  boots              : FEET,
  kicks              : FEET,
  sandals            : FEET
};

export const origins = {
  bethos       : 1,
  lanwhin      : 1,
  baltimore    : 1,
  gorgon       : 1,
  greyscale    : 1,
  booleana     : 1,
  loremipsumis : 1,
  fantasmo     : 1,
  flaggor      : 1,
};

export const elements = {
  none      : 0.1,
  fire      : 1.2,
  ice       : 1.2,
  lightning : 1.2,
  light     : 1.5,
};

export const wearing = {
  basic    : 0.1,
  common   : 0.8,
  prestine : 1.1,
  powerful : 1.5,
  super    : 2.0,
  thorged  : 2.5,
};
