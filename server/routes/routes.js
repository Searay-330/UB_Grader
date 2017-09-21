import { Router } from 'express';
import * as AuthController from '../controllers/AuthenticationController'
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
router.get('/auth/google/callback', passport.authenticate('google'), AuthController.loginRedirect);

//Sends back the user that is currently logged in.
router.get('/current_user', 		AuthController.getCurrentUser);

//Logs out user
router.get('/logout',				AuthController.logoutUser);

//Returns the courses for the user depending on access level.
router.get('/courses', 				AuthCheck.isAuthenticated, CourseController.getCourses);

//Returns the assignments of a specific course that user is enrolled in.
router.get('/:course_num/assignments',	AuthCheck.isAuthenticated, CourseController.getAssignments);

export default router;
