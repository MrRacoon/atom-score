'use babel';

import { mergeAll } from 'ramda';

import * as types from './types';
import * as history from './history';
import * as score from './score';
import * as counter from './counter';
import * as last from './last';
import * as recent from './recent';
import predictor from './predictor';

const lens = mergeAll([
  score.lens,
  counter.lens,
  last.lens,
  predictor.lens
]);

console.log('lenses', lens);

export default {
  types,
  counter,
  history,
  score,
  last,
  recent,
  predictor,
  lens
};
