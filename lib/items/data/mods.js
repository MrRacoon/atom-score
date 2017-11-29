'use babel';

import { ATTR, EFFECT } from './constants';

const Mod = ({
  name = '',
  type = '',
  effect = '',
  amount = 0,
}) => ({
  name,
  type,
  effect,
  amount
})

export const SHARP = Mod({
  name: 'sharp',
  type: ATTR.ATTACK,
  effect: EFFECT.INCREASE,
  amount: 5
});

export const DULL = Mod({
  name: 'dull',
  type: ATTR.ATTACK,
  effect: EFFECT.DECREASE,
  amount: 5
});

export const HARD = Mod({
  name: 'hard',
  type: ATTR.DEFENSE,
  effect: EFFECT.INCREASE,
  amount: 5
});

export const SOFT = Mod({
  name: 'soft',
  type: ATTR.DEFENSE,
  effect: EFFECT.DECREASE,
  amount: 5
});
