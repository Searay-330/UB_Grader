import { Router } from 'express';
import * as UserController from '../controllers/UserController'
import * as AssignmentController from '../controllers/AssignmentController'
import * as CourseController from '../controllers/CourseController'
import * as SubmissionController from '../controllers/SubmissionController'
import * as TangoController from '../controllers/TangoController'
import * as AuthCheck from '../util/authentication'
import submissionsUpload from '../util/multer_submission_config'
const router = new Router();
const passport = require('passport');
const multer = require('multer');
const path = require('path');
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

const tangoStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		const course = req.params.course_num;
		const assignment = req.body.assignment_num;
		const path = `./uploads/${course}/${assignment}/Tango`
		fs.mkdirsSync(path);
		cb(null, path);
	},
	filename: (req, file, cb) => {
		if (path.extname(file.originalname)	== '.tar'){
			cb(null, "autograde.tar");
		}	
		else {
			cb(null, "autograde-Makefile");
		}
	}
});

// const submissionsStorage = multer.diskStorage({ 
// 	destination: (req, file, cb) => {
// 		const assingment = req.params.assignment_num;
//         const course = req.params.course_num;
// 		const path = `./uploads/${course}/${assingment}/submissions`;
// 		fs.mkdirsSync(path);
// 		cb(null, path);
// 	},
// 	filename: (req, file, cb) => {
// 		const file_name = 'temp'+'-'+file.originalname;		
// 		cb(null ,file_name);
// 	}
// });


const upload = multer({ storage: storage });
const tangoUpload = multer({storage: tangoStorage});
// const submissionsUpload = multer({ storage: submissionsStorage });


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
router.get('/courses/:course_num/assignments/:assignment_num/submissions/:email', AuthCheck.isAuthenticated, AuthCheck.isInstructorOrUser, SubmissionController.getUserSubmissions);

//Returns all the submissions of all users in a specific assignment
router.get('/courses/:course_num/assignments/:assignment_num/submissions', AuthCheck.isAuthenticated, AuthCheck.isInstructor, SubmissionController.getAllSubmissions);

//Returns latest submission of a specific user in a specific assignment
router.get('/courses/:course_num/assignments/:assignment_num/submissions/:email/latest', AuthCheck.isAuthenticated, AuthCheck.isInstructorOrUser, SubmissionController.getLatestSubmission);

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


export default router;
