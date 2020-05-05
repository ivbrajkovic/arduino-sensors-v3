/**
 * Combine reducers and export one root reducer
 */

import { combineReducers } from 'redux';
import userReducer from './user-reducers';
import uiReducer from './ui-reducers';

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer
});

export default rootReducer;
