'use babel';

import { max, min, prop } from 'ramda';
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
      action: payload => ({ payload }),
      reducer: (state, { payload }) => {
        const curr = max(0, state.curr + payload.points);
        return {
          curr,
          hi: max(state.hi, curr),
          lo: min(state.lo, curr),
        };
      },
    },
  ],
};
