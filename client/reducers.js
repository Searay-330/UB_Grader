/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import bs from './modules/bs/Bsreducer';
import assignment from './modules/Assignment/AssignmentReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  bs,
  assignment,
});
