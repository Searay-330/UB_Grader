/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import bs from './modules/bs/BsReducer';
import courses from './modules/Courses/CoursesReducer';
import course from './modules/Courses/modules/Course/CourseReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  bs,
  courses,
  course,
});
