/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import bs from './modules/bs/BsReducer';
import courses from './modules/Courses/CoursesReducer';
import assignments from './modules/Assignments/AssignmentsReducer';
import assignment from './modules/Assignment/AssignmentReducer';
import create from './modules/Assignments/components/CreateAssignment/CreateAssignmentReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  bs,
  courses,
  assignments,
  assignment,
  create,
});
