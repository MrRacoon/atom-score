'use babel';

import { bindActionCreators } from 'redux'

import * as actions from './actions'
import reducer from './reducer'

const binder = dispatch => bindActionCreators(actions, dispatch)

export default { actions, reducer, binder }
