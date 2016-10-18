'use babel';

import * as lens from './lenses';
import * as selector from './selectors';
import { addStim, reset } from './state';
import * as constants from '../constants';

// State serialization
const serialize   = state => JSON.stringify(state);
const deserialize = state => JSON.parse(state);

export default {
  lens,
  selector,
  constants,
  serialize,
  deserialize,
  addStim,
  reset
};
