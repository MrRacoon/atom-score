'use babel';

import reredeux from 'reredeux';
import score from './score';
import counter from './counter';
import streak from './streak';
import last from './last';
import recent from './recent';
import history from './history';
import predictor from './predictor';
import items from './items';

export default reredeux({
  score,
  counter,
  streak,
  last,
  recent,
  history,
  predictor,
  items,
});
