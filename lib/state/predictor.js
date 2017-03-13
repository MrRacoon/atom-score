'use babel';
import { assocPath, compose, pathOr, prop, propOr, reduce, toPairs } from 'ramda';

const tr = (acc, cur) => {
  if (!acc) { return cur; }
  const [accName, accCount] = acc;
  const [curName, curCount] = cur;
  if (accCount >= curCount) {
    return [accName, accCount];
  } else {
    return [curName, curCount];
  }
};

export default {
  init: { },

  select: {
    guess: (state) => (stim) =>
      !stim ? ''
        : compose(
          propOr(null, 0),
          reduce(tr, null),
          toPairs,
          prop(stim.id)
        )(state),
  },

  ducks: [
    {
      name: 'remember',
      action: (last, curr) => ({ payload: { last, curr } }),
      reducer: (s, { payload }) => {
        if (!payload.last || !payload.curr) { return s; }
        const pth = [payload.last.id, payload.curr.id];
        return assocPath(pth, pathOr(0, pth, s) + 1, s);
      }
    },
  ],
};
