'use babel';

const WEAPON = 'weapon';
const HEAD   = 'head';
const TORSO  = 'torso';
const HANDS  = 'hands';
const LEGS   = 'legs';
const FEET   = 'feet';

export const types = {
  axe                : WEAPON,
  'bo staff'         : WEAPON,
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
  phone              : WEAPON,
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

  'camo pants'         : LEGS,
  'cargo pants'        : LEGS,
  'compression shorts' : LEGS,
  dresspants           : LEGS,
  kilt                 : LEGS,
  briefs               : LEGS,
  thong                : LEGS,
  boxers               : LEGS,
  jeans                : LEGS,
  shorts               : LEGS,
  slacks               : LEGS,
  stockings            : LEGS,
  sweats               : LEGS,
  tights               : LEGS,

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
  ''        : 1.1,
  fire      : 1.3,
  ice       : 1.3,
  lightning : 1.3,
  light     : 1.5,
};

export const wearing = {
  basic    : 1.1,
  common   : 1.3,
  prestine : 1.7,
  powerful : 2.3,
  super    : 2.9,
  thorged  : 3.5,
};
