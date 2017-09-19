/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import bs from './modules/bs/Bsreducer';
import assignments from './modules/Assignments/AssignmentsReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  bs,
  assignments,
});
