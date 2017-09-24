import User from '../models/User'
import Course from '../models/Course'
import * as AuthCheck from '../util/authentication'

/**
 * Gets the courses for user depending on access level.
 * @param req : User's request
 * @param res : The response back to the caller.
 * Sends a list of courses back as the response (a list of json objects)
 */
export function getCourses(req, res) {

    var sys_role = AuthCheck.getAccessLevel(req, res);
    if (sys_role) {
        if (sys_role === 'admin') {

            Course.find({}, (err, allCourses) => {
                if (err) res.status(500).send(err);
                var courses = [];                
                for (var i=0; i<allCourses.length; i++) {
                    courses.push({
                        id:             allCourses[i].id,
                        course_num:     allCourses[i].course_num,
                        display_name:   allCourses[i].display_name,
                        semester:       allCourses[i].semester
                    });
                }
                res.send(courses);  
            });            
        }
    }
    else{

        var courselist = [];

        Course.find({}, (err, courses) => {
            if (err) res.status(500).send(err);            
            req.user.courses.forEach((course) => {
                courses.forEach((courseobj) => {
                    if (course.course_id == courseobj.id){
                        courselist.push({
                            id:                 courseobj.id,
                            course_num:         courseobj.course_num,
                            display_name:       courseobj.display_name,
                            semester:           courseobj.semester
                        });
                    }
                });
            });
            res.send(courselist);
        });

    }

}

/**
 * Gets all the assignments of a specific course.
 * @param req : User's request (should contain course_id as a parameter)
 * @param res : The response back to the caller.
 * Sends a list of the assignments back as the response (a list of json objects)
 */

export function getAssignments(req, res){
    Course.findOne({ 'course_num': req.params.course_num }, (err, course) => {
        if (err) res.status(500).send(err);                    
        res.send(course.assignments);
    })
}


/**
 * Gets all the students of a specific course.
 * @param req : User's request (should contain course_id as a parameter)
 * @param res : The response back to the caller.
 * Sends a list of the students back as the response (a list of json objects)
 */

export function getStudents(req, res){
    var studentList = [];
    User.find({}, (err, users) => {
        if (err) res.status(500).send(err);            
        users.forEach((user) => {
            user.courses.forEach((course) => {
                if (course.course_num == req.params.course_num && course.course_role == 'Student'){
                    studentList.push(user);
                }
            });
        });
        res.send(studentList);
    });
}


/**
 * Gets all the sections of a specific course.
 * @param req : User's request (should contain course_id as a parameter)
 * @param res : The response back to the caller.
 * Sends a list of the sections back as the response (a list of json objects)
 */

export function getSections(req, res){
    var sectionList = [];
    Course.findOne({ 'course_num': req.params.course_num }, (err,course) =>{
        if (err) res.status(500).send(err);                    
        res.send(course.sections);
    })
}


/**
 * Gets all the students of a specific section of a course.
 * @param req : User's request (should contain course_id and section_id as a parameter)
 * @param res : The response back to the caller.
 * Sends a list of the students back as the response (a list of json objects)
 */

export function getSectionStudents(req, res){
    var studentList = [];
    User.find({}, (err, users) => {
        if (err) res.status(500).send(err);            
        users.forEach((user) => {
            user.courses.forEach((course) => {
                if (course.course_num == req.params.course_num && course.section_id == req.params.section_id && course.course_role == 'Student'){
                    studentList.push(user);
                }
            });
        });
        res.send(studentList);
    });
}