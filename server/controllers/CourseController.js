import User from '../models/User'
import Course from '../models/Course'
import * as AuthCheck from '../util/authentication'
const fs = require('fs');
const csv = require('fast-csv');

/**
 * Gets the courses for user depending on access level.
 * @param req : User's request
 * @param res : The response back to the caller.
 * Sends a list of courses back as the response (a list of json objects)
 */
export function getCourses(req, res) {

    if (req.user.sys_role === 'admin') {
        Course.find({}, (err, allCourses) => {
            if (err){
                res.status(500).send(err);
            }
            else {  
                var courses = [];                
                for (var i=0; i<allCourses.length; i++) {
                    courses.push({
                        id:             allCourses[i].id,
                        course_num:     allCourses[i].course_num,
                        display_name:   allCourses[i].display_name,
                        semester:       allCourses[i].semester
                    });
                }
                res.status(200).send(courses); 
            }            
        });            
    }
    else {
        var courselist = [];

        Course.find({}, (err, courses) => {
            if (err) {
                res.status(500).send(err);
            }
            else {          
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
                res.status(200).send(courselist);
            }
        });
    }
}

/**
 * Gets all the assignments of a specific course.
 * @param req : User's request (should contain course_num as a parameter)
 * @param res : The response back to the caller.
 * Sends a list of the assignments back as the response (a list of json objects)
 */

export function getAssignments(req, res){
    if (req.user.sys_role == 'admin') {
        Course.findOne({ 'course_num': req.params.course_num }, (err, course) => {
            if (err) res.status(500).send(err);                    
            else res.status(200).send(course.assignments);
        });
    }
    else {
        var inCourse = false;
        req.user.courses.forEach((course) => {
            if (course.course_num == req.params.course_num){
                inCourse = true;                
                Course.findOne({ 'course_num': req.params.course_num }, (err, course) => {
                    if (err) res.status(500).send(err);                    
                    else res.status(200).send(course.assignments);
                });
            }
        });
        if (!inCourse){
            res.redirect('/');
        }
    }
}


/**
 * Gets all the students of a specific course.
 * @param req : User's request (should contain course_num as a parameter)
 * @param res : The response back to the caller.
 * Sends a list of the students back as the response (a list of json objects)
 */

export function getStudents(req, res){
    var studentList = [];
    User.find({}, (err, users) => {
        if (err) {
            res.status(500).send(err); 
        }
        else {          
            users.forEach((user) => {
                user.courses.forEach((course) => {
                    if (course.course_num == req.params.course_num && course.course_role == 'student'){
                        studentList.push(user);
                    }
                });
            });
            res.status(200).send(studentList);
        }
    });
}


/**
 * Gets all the sections of a specific course.
 * @param req : User's request (should contain course_num as a parameter)
 * @param res : The response back to the caller.
 * Sends a list of the sections back as the response (a list of json objects)
 */

export function getSections(req, res){
    var sectionList = [];
    Course.findOne({ 'course_num': req.params.course_num }, (err,course) =>{
        if (err) res.status(500).send(err);                    
        else res.status(200).send(course.sections);
    })
}


/**
 * Gets all the students of a specific section of a course.
 * @param req : User's request (should contain course_num and section_name as a parameter)
 * @param res : The response back to the caller.
 * Sends a list of the students back as the response (a list of json objects)
 */

export function getSectionStudents(req, res){
    var studentList = [];
    User.find({}, (err, users) => {
        if (err) {
            res.status(500).send(err);
        }
        else {           
            users.forEach((user) => {
                user.courses.forEach((course) => {
                    if (course.course_num == req.params.course_num && course.section_name == req.params.section_name && course.course_role == 'student'){
                        studentList.push(user);
                    }
                });
            });
            res.status(200).send(studentList);
        } 
    });
}

/**
 * Creates a new course.
 * @param req : User's request
 * @param res : The response back to the caller.
 * Sends back a JSON object of the created course.
 */

export function createCourse(req, res){
    var course = new Course(req.body);        
    course.save((err, courseobj) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(courseobj);
    });
}


/**
 * Updates an existing course.
 * @param req : User's request
 * @param res : The response back to the caller.
 * Sends back a JSON object of the updated course.
 */
export function updateCourse(req, res){

    Course.findOne({ 'course_num': req.params.course_num }, (err,courseobj) =>{
        if (err){
            res.status(500).send(err);
        }  
        else {
            if (req.body.display_name){
                courseobj.display_name = req.body.display_name;
            }
            if (req.body.semester){
                courseobj.semester = req.body.semester;
            }                   
            if (req.body.sections){
                courseobj.sections = req.body.sections;
            }
            courseobj.save((err, updatedcourseobj) => {
                if (err) res.status(500).send(err);
                else res.status(200).send(updatedcourseobj);
            });
        }
    });

}

//NEED TO DETERMINE WHAT SHOULD BE SENT BACK
/**
 * Adds specified user to specified course
 * @param req : User's request
 * @param res : The response back to the caller.
 * Sends back a JSON object.
 */
export function addCourseToUser(req,res){
        // console.log(req.body);
        User.findOne({'email': req.body.student_email}, (err, userobj) => {
            if (err) {
                res.status(500).send(err); 
            }
            else{                   
                Course.findOne({'course_num': req.params.course_num}, (err, courseobj) => {
                    var alreadyEnrolled = false;
                    if (err) {
                        res.status(500).send(err);
                    }
                    else{
                        if (courseobj){
                            if (userobj) {            
                                var course_info = {
                                                    course_id:    courseobj.id,
                                                    course_num:   courseobj.course_num,
                                                    course_role:  req.body.course_role
                                                }
                                userobj.courses.forEach((course) => {
                                    if (course.course_num == course_info.course_num){
                                        alreadyEnrolled = true;
                                    }
                                });
                                if (alreadyEnrolled){
                                    res.status(200).send({Status: 200, Message: 'User is already enrolled in course!'});  
                                } 
                                else {
                                    userobj.courses.addToSet(course_info);
                                    userobj.save((err, updateduserobj) => {
                                        if (err) res.status(500).send(err);                
                                        else res.status(200).send({Status: 200, Message: 'Successfully added '+userobj.email+' to '+courseobj.display_name});
                                    });
                                }
                            }
                            else {
                                    const new_user = new User({
                                        email:      req.body.student_email,
                                        updated_at: new Date(),
                                        courses:     {
                                                        course_id:      courseobj.id,
                                                        course_num:     courseobj.course_num,
                                                        course_role:    req.body.course_role
                                                    }
                                    });
    
                                    User.create(new_user, (err) => {
                                        if (err) res.status(500).send(err);
                                        else res.status(200).send({Status: 200, Message: 'Successfully added '+req.body.student_email+' to '+courseobj.display_name});
            
                                    }); 
                            }    
                        }
                        else{
                            res.status(404).send({Status: 404, Message: 'Sorry, unable to find that course'});                              
                        }
                    }
                });
            }
        });
    }
    

//NEED TO DETERMINE WHAT SHOULD BE SENT BACK
/**
 * Adds specified user to specific section in course
 * @param req : User's request
 * @param res : The response back to the caller.
 * Sends back a JSON object.
 */
export function addUserToSection(req,res){
    User.findOne({'email': req.body.student_email}, (err, userobj) => {
        if (err) {
            res.status(500).send(err);    
        }
        else{                
            Course.findOne({'course_num': req.params.course_num}, (err, courseobj) => {
                var isInSection = false;
                if (err) {
                    res.status(500).send(err);
                }
                if (!courseobj || !userobj) {
                    res.status(404).send({Status: 404, Message: 'Sorry, unable to find that user and/or course'});  
                }
                else {           
                    courseobj.sections.forEach((section) => {
                        if (section.name == req.params.section_name){
                            userobj.courses.forEach((course) => {
                                if (course.course_num == req.params.course_num){
                                    course.section_id = section.id;
                                    course.section_name = section.name;
                                    isInSection = true;
                                    userobj.save((err, updateduserobj) => {
                                        if (err) res.status(500).send(err);                
                                        else res.status(200).send({Status: 200, Message: 'Successfully added '+userobj.email+' to '+section.name});
                                    });
                                }
                            });
                        }
                    });
                    if (!isInSection) res.status(406).send({Status: 406, Message: 'Sorry, cannot user to that section'});  
                }
            });
        } 
    });
}

//NEED TO DETERMINE WHAT SHOULD BE SENT BACK
/**
 * Removes specified user to specific section in course
 * @param req : User's request
 * @param res : The response back to the caller.
 * Sends back a JSON object.
 */

export function removeUserFromSection(req, res){
    User.findOne({'email': req.body.student_email}, (err, userobj) => {
        var inSection = false;
        if (err) {
            res.status(500).send(err);    
        }
        else{                
            if (!userobj) {
                res.status(404).send({Status: 404, Message: 'Sorry, unable to find that user'});  
            }
            else {
                userobj.courses.forEach((course) => {
                    if (course.course_num == req.params.course_num && course.section_name == req.params.section_name){
                        course.section_name = undefined;
                        course.section_id = undefined;
                        inSection = true;
                        userobj.save((err, updateduserobj) => {
                            if (err) res.status(500).send(err);                
                            else res.status(200).send({Status: 200, Message: 'Successfully removed '+userobj.email+' from '+req.params.section_name});
                        });
                    }
                });
                if (!inSection) res.status(406).send({Status: 406, Message: 'Sorry, user is not enrolled in that course and/or section'});
            } 
        } 
    });
}

//NEED TO DETERMINE WHAT SHOULD BE SENT BACK
/**
 * Removes a specified user from specified course
 * @param req : User's request
 * @param res : The response back to the caller.
 * Sends back a JSON object.
 */

export function removeCourseFromUser(req,res){
    User.findOne({'email': req.body.student_email}, (err, userobj) => {
        var isEnrolled = false;        
        if (err) {
            res.status(500).send(err);
        }
        else{
            if (userobj) {
                userobj.courses.forEach((course) => {
                    if (course.course_num == req.params.course_num){
                        isEnrolled = true;
                        var index = userobj.courses.indexOf(course);
                        userobj.courses.splice(index,1);
                        userobj.save((err, updateduserobj) => {
                            if (err) return res.status(500).send(err);                
                            else res.status(200).send({Status: 200, Message: 'Successfully removed '+userobj.email+' from '+course.course_num});
                        });            
                    }
                });
            }
            else{
                return res.status(404).send({Status: 404, Message: 'Sorry, unable to find that user'});   
            }
        }
        if(!isEnrolled) res.status(406).send({Status: 406, Message: 'Sorry, unable to remove user from course'});                                      
    });
}

/**
 * Helper function for adding a student to a course per row in CSV file
 * @param data : A row from the inputted CSV roster file
 * Returns a promise.
 */
function addStudentFromCSV (data){
    return new Promise((resolve, reject) => {

        User.findOne({'email': data[0]}, (err, userobj) => {
            if (err) {
                reject(new Error(err));            
            }
            else{
                Course.findOne({'course_num': data[3]}, (err, courseobj) => {
                    if (!courseobj){
                        reject(new Error('Sorry, unable to find that course'));                                    
                    }
                    else{
                    var alreadyEnrolled = false;
                    var user_email = data[0];
                    var course_num = data[3];
                    var course_id = courseobj.id
                    if (!userobj){
                        const new_user = new User({
                                                    first_name: data[2],
                                                    last_name:  data[1],
                                                    email:      user_email,
                                                    updated_at: new Date(),
                                                    courses:     {
                                                                    course_id:      course_id,
                                                                    course_num:     course_num,
                                                                    course_role:    'student'
                                                                }
                                                });
                        User.create(new_user, (err) => {
                            if (err) reject(new Error(err));
                            else resolve(new_user);

                        });                
                    }
                    else{
                        var new_course = {
                            course_id:      course_id,
                            course_num:     course_num,
                            course_role:    'student'
                        }

                        userobj.courses.forEach((course) => {
                            if (course.course_num == new_course.course_num){
                                alreadyEnrolled = true;
                            }
                        });

                        if (!alreadyEnrolled) {
                            userobj.courses.addToSet(new_course);
                            userobj.save((err, updateduserobj) => {
                                if (err) reject(new Error(err));
                                else resolve(updateduserobj);
                            });
                        }
                    }
                }
                });
            }
        });
    });

}

/**
 * Helper function for removing all students registered for course that are not included in the CSV roster file/ 
 * @param updated_student_list : An array of all the students that are in the CSV roster file
 * @param course_num : The official course_num for which the CSV roster has been submitted.
 * Returns a promise.
 */
function removeStudentsBasedOnCSV (updated_student_list, course_num){

    return new Promise((resolve, reject) => {

        User.find({}, (err,result) => {
            result.forEach((user) => {
                user.courses.forEach((course) => {
                    if (course.course_num == course_num){
                        var indexInUpdated = updated_student_list.indexOf(user.email);
                        if (indexInUpdated == -1){
                            var index = user.courses.indexOf(course);
                            user.courses.splice(index,1);
                            user.save((err, updateduserobj) => {
                                if (err) reject(new Error(err));               
                            }); 
                        } 
                    }
                });
            });
            resolve();
        });
});

}


//STILL HAVE TO CHECK FOR MALFORMED CSV FILES (ROSTER THAT DOESNT HAVE PROPER FORMAT)
//STILL NEED TO DETERMINE WHAT TO RETURN

/**
 * Function for parsing the CSV roster file to add users to specifed course
 * @param req : User's request
 * @param res : The response back to the caller.
 * Returns a JSON object..
 */

export function importRoster(req, res){

    var roster = req.files[0].path;
    var error = false;
    var students = [];
    var course = null;
    fs.createReadStream(roster)
    .pipe(csv())
    .on('data', (data) => {
        students.push(data[0]);
        course = data[3];
        addStudentFromCSV(data)
        .then((userobj) => {
        })
        .catch((err) => {
            console.log(err);
        });
    })
    .on('end', (data) => {
        console.log(error);
        if (error) {
            return res.status(500).send({Status: 500, Message: 'Sorry there was an error adding students!'});
        }
        else {
            if (req.body.complete == 'true'){
                removeStudentsBasedOnCSV(students, course)
                .then(() => {
                    res.status(200).send({Status: 200, Message: "Successfully updated the course's student list"});                    
                })
                .catch((err) => {
                    res.status(500).send({Status: 500, Message: "Sorry, unable to update the course's student list"});                    
                });
            }
            else{
                res.status(200).send({Status: 200, Message: "Successfully added students to the course"});                                    
            }
        }
    });

}
