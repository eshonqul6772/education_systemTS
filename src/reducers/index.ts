import { combineReducers } from 'redux';

import reduce from './reduce';

export default combineReducers({
  auth: reduce,
});
