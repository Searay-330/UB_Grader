import { Router } from 'express';
import * as UserController from '../controllers/UserController'
import * as AssignmentController from '../controllers/AssignmentController'
import * as CourseController from '../controllers/CourseController'
import * as SubmissionController from '../controllers/SubmissionController'
import * as TangoController from '../controllers/TangoController'
import * as AuthCheck from '../util/authentication'
import submissionsUpload from '../util/multerSubmissionConfig'
import tangoUpload from '../util/multerTangoConfig'
import callbackUpload from '../util/multerCallbackConfig'
import rosterUpload from '../util/multerRosterConfig'

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

//Returns all the submission of a specific user and assignment
router.get('/courses/:course_num/assignments/:assignment_num/submissions/user/:email', AuthCheck.isAuthenticated, AuthCheck.isInstructorOrUser, SubmissionController.getUserSubmissions);

//Returns all the submissions of all users in a specific assignment
router.get('/courses/:course_num/assignments/:assignment_num/submissions', AuthCheck.isAuthenticated, AuthCheck.isInstructor, SubmissionController.getAllSubmissions);

//Returns latest submission of a specific user in a specific assignment
router.get('/courses/:course_num/assignments/:assignment_num/submissions/:email/latest', AuthCheck.isAuthenticated, AuthCheck.isInstructorOrUser, SubmissionController.getLatestSubmission);

//Returns latest submission of all users in a specific assignment
router.get('/courses/:course_num/assignments/:assignment_num/submissions/latest', AuthCheck.isAuthenticated, AuthCheck.isInstructor, SubmissionController.getAllLatestSubmissions);

//Returns latest submission of all users in all assignments
router.get('/courses/:course_num/submissions/latest', AuthCheck.isAuthenticated, AuthCheck.isInstructor, SubmissionController.getAllLatestSubmissionsInAssignments);

//Returns latest submissions of a user in all assignments
router.get('/courses/:course_num/submissions/:email/latest', AuthCheck.isAuthenticated, AuthCheck.isInstructorOrUser, SubmissionController.getLatestSubmissionsInAssignments);

//Returns max submission of all users in a specific assignment
router.get('/courses/:course_num/assignments/:assignment_num/submissions/max', AuthCheck.isAuthenticated, AuthCheck.isInstructor, SubmissionController.getAllMaxSubmissions);

//Returns max submissions of a user in all assignments
router.get('/courses/:course_num/submissions/:email/max', AuthCheck.isAuthenticated, AuthCheck.isInstructorOrUser, SubmissionController.getMaxSubmissionsInAssignments);

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
router.post('/courses/:course_num/importRoster', rosterUpload.any(), AuthCheck.isAuthenticated, AuthCheck.isInstructor, CourseController.importRoster);

//Create an assignment for a course
router.post('/courses/:course_num/assignments/create', AuthCheck.isAuthenticated, AuthCheck.isInstructor, tangoUpload.any(), AssignmentController.createAssignment);

//Updates an assignment for a course
router.post('/courses/:course_num/assignments/:assignment_num/update', AuthCheck.isAuthenticated, AuthCheck.isInstructor, AssignmentController.updateAssignment);

router.post('/courses/:course_num/assignments/:assignment_num/delete', AuthCheck.isAuthenticated, AuthCheck.isInstructor, AssignmentController.deleteAssignment);

//Creates a new Submission
router.post('/courses/:course_num/assignments/:assignment_num/submissions/create', AuthCheck.isAuthenticated, submissionsUpload.any(), SubmissionController.createSubmission);

//Updates a Submission
router.post('/courses/:course_num/assignments/:assignment_num/submissions/:email/:version/update', AuthCheck.isAuthenticated, AuthCheck.isInstructor, SubmissionController.updateSubmission);

//Deletes a Submission
// router.post('/courses/:course_num/assignments/:assignment_num/submissions/:email/:version/delete', AuthCheck.isAuthenticated, AuthCheck.isInstructor, SubmissionController.deleteSubmission);

router.post('/Tango/callback/:course_num/:assignment_num/:submission_id', callbackUpload.any(), TangoController.callbackTango);

export default router;
