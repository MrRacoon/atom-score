'use babel';
import { prepend, take } from 'ramda';

export default {
  init: [],
  select: {},
  ducks: [
    {
      name: 'update',
      action: payload => ({ payload }),
      reducer: (s, { payload }) => take(30, prepend(payload, s)),
    },
  ],
};
