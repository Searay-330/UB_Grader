import User from '../models/User'
import Course from '../models/Course'
import Submission from '../models/Submission'
import * as TangoController from './TangoController'
import * as AuthCheck from '../util/authentication'

var async = require('async');

/**
 * Gets all the user submissions of a specific assignment.
 * @param req : User's request (should contain course_num, assignment_num, email as a parameter)
 * @param res : The response back to the caller.
 * Sends a list of the submissions of a user in a particular assignment back as the response (a list of json objects)
 */

export async function getUserSubmissions(req, res) {
    try{
        let submissions = await Submission.find({
            'course_num': req.params.course_num,
            'assignment_num': req.params.assignment_num,
            'user_email': req.params.email
        });
        if(submissions.length){
            res.status(200).send(submissions);
        } else {
            res.status(404).send({Status: 404, Message: "No submissions from this user at the moment"});
        }
    } catch(err) {
        res.status(500).send(err);
    }
}

/**
 * Gets the latest user submission of a specific assignment.
 * @param req : User's request (should contain course_num, assignment_num and email as a parameter)
 * @param res : The response back to the caller.
 * Sends the latest submissions of a user in a particular assignment back as the response (a list of json object)
 */

export async function getLatestSubmission(req, res) {
    try {
        let submissions = await Submission.findOne({
            "user_email": req.params.email, 
            'course_num': req.params.course_num, 
            "assignment_num": req.params.assignment_num}).sort('-version').exec(function (err, submission) {
            if(submission){
                res.status(200).send(submission);
            } else {
                res.status(404).send({Status: 404, Message: "No submissions from this user at the moment"});
            }
        });
    } catch (err) {
                res.status(500).send(err);
    }
}

/**
 * Gets the latest submissions of all users in a specific assignment.
 * @param req : User's request (should contain course_num, assignment_num as a parameter)
 * @param res : The response back to the caller.
 * Sends the latest submissions of all the users in a particular assignment back as the response (a list of json object)
 */

export async function getAllLatestSubmissions(req, res) {
    try {
        let course = await Course.findOne({'course_num': req.params.course_num});
        let assignment = course.assignments.id(req.params.assignment_num);

        var submissionList = [];
        assignment.user_submissions.forEach((sub) => {
            submissionList.push(function(callback) {
                var temp = Submission.findOne({
                    version: sub.submissions, 
                    user_email: sub.email, 
                    assignment_num: req.params.assignment_num,
                    course_num: req.params.course_num
                }, (err, submissionObj) => {
                    callback(null, submissionObj);
                });
            });
        });

        async.parallel(submissionList, function(err, result) {
            if (err) return res.status(500).send(err);
            if(submissionList.length){
                res.status(200).send(result);
            } else {
                res.status(404).send({Status: 404, Message: "No submissions at the moment"});
            }
        }); 

    } catch(err){
        res.status(500).send(err);
    }
}

/**
 * Gets the latest submissions of a user in a all assignments.
 * @param req : User's request (should contain course_num, assignment_num, email as a parameter)
 * @param res : The response back to the caller.
 * Sends the latest submissions of a user in all assignments back as the response (a list of json object)
 */

export async function getLatestSubmissionsInAssignments(req, res) {
    try {
        let course = await Course.findOne({'course_num': req.params.course_num});

        var submissionList = [];
        course.assignments.forEach((assignment) => {
            assignment.user_submissions.forEach((sub) => {
                if(sub.email == req.params.email){
                    submissionList.push(function(callback) {
                        var temp = Submission.findOne({
                            version: sub.submissions, 
                            user_email: sub.email, 
                            assignment_num: assignment.assignment_num,
                            course_num: req.params.course_num
                        }, (err, submissionObj) => {
                            callback(err, submissionObj);
                        });
                    });
                }
            });
        });

        async.parallel(submissionList, function(err, result) {
            if (err) return res.status(500).send(err);
            if(submissionList.length){
                res.status(200).send(result);
            } else {
                res.status(404).send({Status: 404, Message: "No submissions from this user at the moment"});
            }
        });
        
    } catch(err){
        res.status(500).send(err);
    }
}

/**
 * Gets the latest submissions of all users in all assignments.
 * @param req : User's request (should contain course_num, assignment_num as a parameter)
 * @param res : The response back to the caller.
 * Sends the latest submissions of all the users in all the assignments back as the response (a list of json object)
 */

export async function getAllLatestSubmissionsInAssignments(req, res) {
    try{
        let course = await Course.findOne({'course_num': req.params.course_num});

        var submissionList = [];
        course.assignments.forEach((assignment) => {
            assignment.user_submissions.forEach((sub) => {
                submissionList.push(function(callback) {
                    var temp = Submission.findOne({
                        version: sub.submissions, 
                        user_email: sub.email, 
                        assignment_num: assignment.assignment_num,
                        course_num: req.params.course_num
                    }, (err, submissionObj) => {
                        callback(err, submissionObj);
                    });
                });
            });
        });
        async.parallel(submissionList, function(err, result) {
            if (err) 
                return res.status(500).send(err);
            if(submissionList.length){
                res.status(200).send(result);
            } else {
                res.status(404).send({Status: 404, Message: "No submissions at the moment"});
            }
        });

    } catch(err){
        res.status(500).send(err);
    }
}

/**
 * Gets the max submissions of a user in all assignments.
 * @param req : User's request (should contain course_num, assignment_num, email as a parameter)
 * @param res : The response back to the caller.
 * Sends the max submissions of a user in all assignments back as the response (a list of json object)
 */

export function getMaxSubmissionsInAssignments(req, res, next) {
    Course.findOne({'course_num': req.params.course_num}, (err, course) => {
        if (err){
            res.status(500).send(err);
        } else {
            var submissionFound = false;
            var submissionList = [];
            course.assignments.forEach((assignment) => {
                assignment.user_submissions.forEach((sub) => {
                    if(sub.email == req.params.email){
                        submissionFound = true;
                        submissionList.push(function(callback) {
                            var temp = Submission.find({
                                user_email: sub.email,
                                assignment_num: assignment.assignment_num,
                                course_num: req.params.course_num
                            }, (err, submissionObj) => {
                                callback(err, submissionObj);
                            });
                        });
                    }
                });
            });
            async.parallel(submissionList, function(err, result) {
                if (err)
                    return res.status(500).send(err);
                if(submissionFound) {
                    var assignments = {};
                    result.forEach((assignment) => {
                        var assignmentName = null;
                        assignment.forEach((submission) => {
                            var scoreTotal = 0;
                            assignmentName = submission.assignment_num;
                            if (assignments[assignmentName] == null)
                                assignments[assignmentName] = [null, 0];
                            submission.scores.forEach((problem) => {
                                scoreTotal += problem.score;
                            });
                            if (scoreTotal > assignments[assignmentName][1])
                                assignments[assignmentName] = [submission, scoreTotal];
                        });
                    });
                    var maxSubmissions = [];
                    for (var assignmentNum in assignments) {
                        var assignment = assignments[assignmentNum];
                        maxSubmissions.push(assignment[0]);
                    }
                    res.status(200).send(maxSubmissions);
                } else {
                    res.status(404).send({Status: 404, Message: "No submissions from this user at the moment"});
                }
            });
        }
    });
}

/**
 * Gets the max submissions of all users in a specific assignment.
 * @param req : User's request (should contain course_num, assignment_num as a parameter)
 * @param res : The response back to the caller.
 * Sends the max submissions of all the users in a particular assignment back as the response (a list of json object)
 */

export function getAllMaxSubmissions(req, res, next) {
    Course.findOne({'course_num': req.params.course_num}, (err, course) => {
        if (err){
            res.status(500).send(err);
        } else {
            course.assignments.forEach((assignment) => {
                if(assignment.assignment_num == req.params.assignment_num){
                    var submissionFound = false;
                    var submissionList = [];
                    assignment.user_submissions.forEach((sub) => {
                        submissionFound = true;
                        submissionList.push(function(callback) {
                            var temp = Submission.find({
                                user_email: sub.email,
                                assignment_num: req.params.assignment_num,
                                course_num: req.params.course_num
                            }, (err, submissionObj) => {
                                callback(null, submissionObj);
                            });
                        });
                    });
                    async.parallel(submissionList, function(err, result) {
                        if (err)
                            return res.status(500).send(err);
                        if(submissionFound){
                            var maxSubs = {};
                            result.forEach((student) => {
                                student.forEach((submission) => {
                                    var scoreTotal = 0;
                                    if (maxSubs[submission.user_email] == null)
                                        maxSubs[submission.user_email] = [null, 0];
                                    submission.scores.forEach((problem) => {
                                        scoreTotal += problem.score;
                                    });
                                    if (scoreTotal > maxSubs[submission.user_email][1])
                                        maxSubs[submission.user_email] = [submission, scoreTotal];
                                });
                            });
                            var maxSubmissions = [];
                            for (var student in maxSubs){
                                var sub = maxSubs[student];
                                maxSubmissions.push(sub[0]);
                            }
                            res.status(200).send(maxSubmissions);
                        } else {
                            res.status(404).send({Status: 404, Message: "No submissions at the moment"});
                        }
                    });
                }
            });
        }
    });
}

/**
 * Gets all the submissions of a specific assignment.
 * @param req : User's request (should contain course_num and assignment_num as a parameter)
 * @param res : The response back to the caller.
 * Sends a list of all the submissions in a specific assignment back as the response (a list of json objects)
 */

export async function getAllSubmissions(req, res){
    try{
        let submissions = await Submission.find({
            'course_num': req.params.course_num,
        });
        if(submissions.length){
            res.status(200).send(submissions);
        } else {
            res.status(404).send({Status: 404, Message: "No submissions from this user at the moment"});
        }
    } catch(err) {
        res.status(500).send(err);
    }
}

/**
 * Creates a submission
 * @param req : User's request
 * @param res : The response back to the caller.
 * Sends back a JSON object of the created submission.
 */

export async function createSubmission(req, res) {
    if (!req.files){
        res.status(400).send({Status: 400, Message: 'Sorry, you must submit exactly one file'});
    }
    else{
        try{
            let user = await User.findOne({"email": req.user.email});
            let course = await Course.findOne({'course_num': req.params.course_num});
            let assignment = course.assignments.id(req.params.assignment_num);
            assignment.user_submissions.forEach((sub) => {
                if(sub.email == user.email){
                    var submission = new Submission();
                    submission.user_id = user.id;
                    submission.user_email = user.email;
                    submission.course_num = course.course_num;
                    submission.assignment_num = assignment.assignment_num;
                    submission.file_name = req.files[0].filename;
                    submission.version = sub.submissions;
                    submission.feedback = "Waiting for feedback";
                    submission.form_data = "Placeholder";

                    if (assignment.auto_grader){
                        submission.grader = "Autograder";
                        console.log("Calling send to Tango");
                        TangoController.sendToTango(submission, assignment, course);
                    } else {
                        submission.grader = "Manual Grader";
                    }
                    
                    submission.save((err, submissionObj) => {
                        if (err) res.status(500).send(err);
                        res.status(200).send(submissionObj);
                    });
                }
            });

        } catch(err){
            res.status(500).send(err);
        }
    }
 }

/**
 * Updates a specified submission
 * @param req : User's request
 * @param res : The response back to the caller.
 * Sends back a JSON object of the updated submission.
 */

export function updateSubmission(req, res) {
    Course.findOne({'course_num': req.params.course_num}, (err, course) => {
        if (err){
            res.status(500).send(err);
        } else {
            course.assignments.forEach((assignment) => {
                if(assignment.assignment_num == req.params.assignment_num){
                        var version = req.params.version;
                        Submission.findOne({
                            version: version,
                            user_email: req.params.email,
                            assignment_num: req.params.assignment_num,
                            course_num: req.params.course_num
                        }, (err, submissionObj) => {
                            for (var key in req.body) {
                                if (req.body.hasOwnProperty(key)) {
                                    var item = req.body[key];
                                    submissionObj.set(key, item);
                                }
                            }
                            submissionObj.save((err, updatedsubmissionObj) => {
                                if (err) res.status(500).send(err);
                                else res.status(200).send(updatedsubmissionObj);
                            });
                        });
                    }
            });
        }
    });
}

/**
 * Deletes a specified submission
 * @param req : User's request
 * @param res : The response back to the caller.
 * Sends back a JSON object of the deleted submission.
 */

export function deleteSubmission(req, res) {
    Submission.findByIdAndRemove(req.params.submission_id, (err, submissionObj) =>{
//        if (err) res.status(500).send(err);
        res.status(200).send(submissionObj);
    }).catch(next);
}
