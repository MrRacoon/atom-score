'use babel';
import { assoc } from 'ramda';
export default {
  init: {},
  select: { },
  ducks: [
    {
      name: 'update',
      action: payload => ({ payload }),
      reducer: (s, { payload }) =>
        assoc(payload.id, (s[payload.id] || 0) + 1, s),
    },
  ],
};
