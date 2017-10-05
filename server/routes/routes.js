import { Router } from 'express';
import * as UserController from '../controllers/UserController'
import * as AssignmentController from '../controllers/AssignmentController'
import * as CourseController from '../controllers/CourseController'
import * as AuthCheck from '../util/authentication'
const router = new Router();
const passport = require('passport');
const multer = require('multer');
const fs = require('fs-extra');
const storage = multer.diskStorage({ 
	destination: (req, file, cb) => {
		const course = req.params.course_num;
		const path = `./uploads/${course}`;
		fs.mkdirsSync(path);
		cb(null, path);
	},
	filename: (req, file, cb) => {
		const file_name = req.user.email+'-'+file.originalname;
		// const file_name = 'aamelunia'+'-'+file.originalname;		
		cb(null ,file_name);
	}
});
const upload = multer({ storage: storage });

//Google OAuth login route
router.get('/auth/google', passport.authenticate('google', {
	scope: ['profile', 'email']
	})
);

//Redirects user upon successful Google OAuth Login
router.get('/auth/google/callback', passport.authenticate('google'), UserController.loginRedirect);

//Sends back the user that is currently logged in.
router.get('/current_user', UserController.getCurrentUser);

//Logs out user
router.get('/logout', UserController.logoutUser);

//Returns the courses for the user depending on access level.
router.get('/courses', AuthCheck.isAuthenticated, CourseController.getCourses);

//Returns the assignments of a specific course that user is enrolled in.
router.get('/courses/:course_num/assignments', AuthCheck.isAuthenticated, CourseController.getAssignments);

//Returns the students of a specific course.
router.get('/courses/:course_num/students', AuthCheck.isAuthenticated, AuthCheck.isInstructor, CourseController.getStudents);

//Returns the sections of a specific course.
router.get('/courses/:course_num/sections', AuthCheck.isAuthenticated, AuthCheck.isInstructor, CourseController.getSections);

//Returns the students of a specific section of a course.
router.get('/courses/:course_num/:section_name/students', AuthCheck.isAuthenticated, AuthCheck.isInstructor, CourseController.getSectionStudents);

//Returns information about a specific user.
router.get('/users/:user_id', AuthCheck.isAuthenticated, UserController.getUser);

//Create a new course
router.post('/courses/create', AuthCheck.isAuthenticated, AuthCheck.isAdmin, CourseController.createCourse);

//Update a course's information
router.post('/courses/:course_num/update', AuthCheck.isAuthenticated, AuthCheck.isInstructor, CourseController.updateCourse);

//Enrolls a specified user in a specified course
router.post('/courses/:course_num/enroll', AuthCheck.isAuthenticated, AuthCheck.isInstructor, CourseController.addCourseToUser);

//Adds specific user to specified section in a course.
router.post('/courses/:course_num/:section_name/enroll', AuthCheck.isAuthenticated, AuthCheck.isInstructor, CourseController.addUserToSection);

//Removes a specific user from a specified section in a course.
router.post('/courses/:course_num/:section_name/drop', AuthCheck.isAuthenticated, AuthCheck.isInstructor, CourseController.removeUserFromSection);

//Removes a user from specified course
router.post('/courses/:course_num/drop', AuthCheck.isAuthenticated, AuthCheck.isInstructor, CourseController.removeCourseFromUser);

//Import a roster for a course
router.post('/courses/:course_num/importRoster', upload.any(), AuthCheck.isAuthenticated, AuthCheck.isInstructor, CourseController.importRoster);

//Create an assignment for a course
router.post('/courses/:course_num/assignments/create', AuthCheck.isAuthenticated, AuthCheck.isInstructor, AssignmentController.createAssignment);




export default router;
