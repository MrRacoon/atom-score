'use babel';
import { prepend } from 'ramda';

export default {
  init: [],
  select: {},
  ducks: [
    {
      name: 'update',
      action: payload => ({ payload }),
      reducer: (s, { payload }) => prepend(payload, s),
    },
  ],
};
