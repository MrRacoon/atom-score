'use babel';

import { inc } from 'ramda';
export default {
  init: 0,
  select: {
    succ: x => x + 1,
    pred: x => x - 1,
  },
  ducks: [
    {
      name: 'update',
      action: (payload) => ({ payload }),
      reducer: inc,
    },
  ],
};
