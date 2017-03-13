'use babel';

import { inc, max, min, prop } from 'ramda';
export default {
  init: {
    curr: 0,
    hi: 0,
    lo: 0,
  },
  select: {
    curr: prop('curr'),
    hi: prop('hi'),
    lo: prop('lo'),
  },
  ducks: [
    {
      name: 'update',
      action: (payload) => ({ payload }),
      reducer: (state, { payload }) => {
        const curr = payload.points > 0
          ? inc(state.curr)
          : 0;
        return {
          curr,
          hi: max(state.hi, curr),
          lo: min(state.lo, curr),
        };
      },
    },
  ],
};
