'use babel';
export default {
  init: null,
  select: {},
  ducks: [
    {
      name: 'update',
      action: payload => ({ payload }),
      reducer: (s, { payload }) => payload,
    },
  ],
};
