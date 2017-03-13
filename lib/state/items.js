'use babel';
import { compose, evolve, prepend, take } from 'ramda';
export default {
  init: {
    recent: [],
    equipped: {},
  },
  select: {},
  ducks: [
    {
      name: 'add',
      action: (payload) => ({ payload }),
      reducer: (state, { payload }) => evolve({
        recent: compose(take(10), prepend(payload)),
        equipped: eq => Object.assign({}, eq, {
          [payload.type]: eq[payload.type] && eq[payload.type].xp > payload.xp
            ? eq[payload.type]
            : payload,
        }),
      }, state)
    },
  ],
};
