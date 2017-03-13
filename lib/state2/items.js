'use babel';
import { evolve, prepend } from 'ramda';
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
        recent: prepend(payload),
        equipped: eq => Object.assign({}, eq, {
          [payload.type]: eq[payload.type] && eq[payload.type].xp > payload.xp
            ? eq[payload.type]
            : payload,
        }),
      }, state)
    },
  ],
};
