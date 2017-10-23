/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import courses from './modules/Courses/CoursesReducer';
import course from './modules/Courses/modules/Course/CourseReducer';
import assignments from './modules/Assignments/AssignmentsReducer';
import assignment from './modules/Assignment/AssignmentReducer';
import create from './modules/Assignments/components/CreateAssignment/CreateAssignmentReducer';
import gradebook from './modules/Gradebook/GradebookReducer';
import createCourse from './modules/Courses/components/CreateCourse/CreateCourseReducer';
import addUser from './modules/Courses/components/AddUser/AddUserReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  courses,
  course,
  assignments,
  assignment,
  create,
  createCourse,
  gradebook,
  addUser,
});
