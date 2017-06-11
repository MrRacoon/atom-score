'use babel';
import {
  always, assoc, evolve, inc, lensPath, min, max, over, pipe, prepend, take
} from 'ramda';

export const INIT = {
  count: 0,
  score: {
    cur: 0,
    hi: 0,
    lo: 0,
  },
  streak: {
    cur: 0,
    hi: 0,
    lo: 0,
  },
  recent: [],
  last: null,
  history: {},
  memory: {}
};

const MAX_RECENT = 30;
const UPDATE = 'ATOM_SCORE/UPDATE';

export const update = payload => ({
  type: UPDATE,
  payload
});


export const reducer = (state = INIT, { type, payload}) => {
  switch(type) {
  case UPDATE:
    return pipe(
      evolve({
        count: x => x + 1,
        score: ({ cur, hi, lo }) => {
          const c = max(0, cur + payload.points);
          return {
            curr: c,
            hi: max(hi, c),
            lo: min(lo, c),
          };
        },
        streak: ({ cur, hi, lo }) => {
          const c = payload.points > 0 ? inc(cur) : 0;
          return {
            cur: c,
            hi: max(hi, c),
            lo: min(lo, c),
          };
        },
        recent: pipe(prepend(payload.combo), take(MAX_RECENT)),
        last: always(payload),
        history: hist => assoc(payload.id, (hist[payload.id] || 0) + 1, hist),
      }),
      (newState) => {
        if (!state.last || !payload) return newState;
        const path = lensPath(['memory', state.last.id, payload.id]);
        const incOrOne = (x) => x ? inc(x) : 1;
        return over(path, incOrOne, newState);
      }
    )(state);
  default:
    return state;
  }
};

export default reducer;
