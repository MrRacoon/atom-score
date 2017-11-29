'use babel';

import { TYPE } from './constants';

const Item = ({
  name = '',
  type = '',
  desc = '',
}) => ({
  name,
  type,
  desc,
});

export const sword = Item({
  name: 'Sword',
  type: TYPE.WEAPON,
  desc: 'Pointy end towards the enemy, no questions',
});

export const hat = Item({
  name: 'Hat',
  type: TYPE.HEADWEAR,
  desc: 'nice and warm',
});

export const shirt = Item({
  name: 'Shirt',
  type: TYPE.SHIRT,
  desc: 'nice and warm',
});

export const pants = Item({
  name: 'Pants',
  type: TYPE.PANTS,
  desc: 'nice and warm',
});
