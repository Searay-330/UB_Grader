import { Router } from 'express';
import * as UserController from '../controllers/UserController'
import * as CourseController from '../controllers/CourseController'
import * as AuthCheck from '../util/authentication'
const router = new Router();
const passport = require('passport');

//Google OAuth login route
router.get('/auth/google', passport.authenticate('google', {
	scope: ['profile', 'email']
	})
);

//Redirects user upon successful Google OAuth Login
router.get('/auth/google/callback', passport.authenticate('google'), UserController.loginRedirect);

//Sends back the user that is currently logged in.
router.get('/current_user', 		UserController.getCurrentUser);

//Logs out user
router.get('/logout',				UserController.logoutUser);

//Returns the courses for the user depending on access level.
router.get('/courses', 				AuthCheck.isAuthenticated, CourseController.getCourses);

//Returns the assignments of a specific course that user is enrolled in.
router.get('/courses/:course_num/assignments',	AuthCheck.isAuthenticated, CourseController.getAssignments);

//Returns the students of a specific course.
router.get('/courses/:course_num/students', AuthCheck.isAuthenticated, AuthCheck.isInstructor, CourseController.getStudents);

//Returns the sections of a specific course.
router.get('/courses/:course_num/sections', AuthCheck.isAuthenticated, AuthCheck.isInstructor, CourseController.getSections);

//Returns the students of a specific section of a course.
router.get('/courses/:course_num/:section_id/students', AuthCheck.isAuthenticated, AuthCheck.isInstructor, CourseController.getSectionStudents);

//Returns information about a specific user.
router.get('/users/:user_id', AuthCheck.isAuthenticated, UserController.getUser);

export default router;
