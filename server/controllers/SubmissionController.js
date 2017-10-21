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
 * Sends a list of the submissions of a user in a perticular assignment back as the response (a list of json objects)
 */

export function getUserSubmissions(req, res, next) {
    var submissionFound = false;
    Submission.find({'user_email': req.params.email}, (err, submissions) => {
        if (err){
            res.status(500).send(err);   
        } else {
            var submissionList = []
            submissions.forEach((submission) => {
                if(submission.course_num == req.params.course_num && submission.assignment_num == req.params.assignment_num){
                    submissionFound = true;
                    submissionList.push(submission);
                }
            });
            if(submissionFound){
                res.status(200).send(submissionList);
            } else {
                res.status(404).send({Status: 404, Message: "No submissions from this user at the moment"});
            }
        }
    });   
}

/**
 * Gets the latest user submission of a specific assignment.
 * @param req : User's request (should contain course_num, assignment_num and email as a parameter)
 * @param res : The response back to the caller.
 * Sends the latest submissions of a user in a perticular assignment back as the response (a list of json object)
 */

export function getLatestSubmission(req, res, next) {
    Course.findOne({'course_num': req.params.course_num}, (err, course) => {
        if (err){
            res.status(500).send(err);
        } else {
            var submissionFound = false;
            course.assignments.forEach((assignment) => {
                if(assignment.assignment_num == req.params.assignment_num){
                    assignment.user_submissions.forEach((sub) => {
                        if(sub.email == req.params.email){
                            submissionFound = true;
                            var latest_version = sub.submissions;
                            Submission.findOne({
                                version: latest_version, 
                                user_email: req.params.email, 
                                assignment_num: req.params.assignment_num,
                                course_num: req.params.course_num
                            }, (err, submissionObj) => {
                                res.status(200).send(submissionObj);
                            });
                        }
                    });
                    if(!submissionFound) res.status(404).send({Status: 404, Message: "No submissions from this user"});
                }
            });
        } 
    });   
}

 /**
 * Gets the latest submissions of all users in a specific assignment.
 * @param req : User's request (should contain course_num, assignment_num as a parameter)
 * @param res : The response back to the caller.
 * Sends the latest submissions of all the users in a perticular assignment back as the response (a list of json object)
 */

export function getAllLatestSubmissions(req, res, next) {
    
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
                        if (err) 
                            return res.status(500).send(err);
                        if(submissionFound){
                            res.status(200).send(result);
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
 * Gets the latest submissions of a user in a all assignments.
 * @param req : User's request (should contain course_num, assignment_num, email as a parameter)
 * @param res : The response back to the caller.
 * Sends the latest submissions of a user in all assignments back as the response (a list of json object)
 */

export function getLatestSubmissionsInAssignments(req, res, next) {
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
                if (err) 
                    return res.status(500).send(err);
                if(submissionFound){
                    res.status(200).send(result);
                } else {
                    res.status(404).send({Status: 404, Message: "No submissions from this user at the moment"});
                }
            });
        } 
    });
}

 /**
 * Gets the latest submissions of all users in all assignments.
 * @param req : User's request (should contain course_num, assignment_num as a parameter)
 * @param res : The response back to the caller.
 * Sends the latest submissions of all the users in all the assignments back as the response (a list of json object)
 */

export function getAllLatestSubmissionsInAssignments(req, res, next) {
    Course.findOne({'course_num': req.params.course_num}, (err, course) => {
        if (err){
            res.status(500).send(err);
        } else {
            var submissionList = [];
            var submissionFound = false;
            course.assignments.forEach((assignment) => {
                assignment.user_submissions.forEach((sub) => {
                    submissionFound = true;
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
                if(submissionFound){
                    res.status(200).send(result);
                } else {
                    res.status(404).send({Status: 404, Message: "No submissions at the moment"});
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

export function getAllSubmissions(req, res, next){
    Submission.find({"course_num":req.params.course_num}, (err, submissions) => {
        var submissionList = []
        var submissionFound = false;
        submissions.forEach((submission) => {
            if(submission.assignment_num == req.params.assignment_num){
                submissionFound = true;
                submissionList.push(submission);
            }
        });
        if(submissionFound){
            res.status(200).send(submissionList);
        } else {
            res.status(404).send({Status: 404, Message: "No submissions at the moment"});
        }
    });
}

/**
 * Creates a submission
 * @param req : User's request
 * @param res : The response back to the caller.
 * Sends back a JSON object of the created submission.
 */

export function createSubmission(req, res, next) {
    var user_email = req.user.email;
    var submissionFound = false;
    if (!req.files){
        res.status(400).send({Status: 400, Message: 'Sorry, you must submit exactly one file'});
    }
    else{
        User.findOne({"email": user_email}, (err, user) =>{
            if (err){
                res.status(500).send(err);   
            } else {
                Course.findOne({'course_num': req.params.course_num }, (err,course) =>{
                    if (err){
                        res.status(500).send(err);   
                    } else {
                        course.assignments.forEach((assignment) => {
                            if(assignment.assignment_num == req.params.assignment_num){
                                assignment.user_submissions.forEach((sub) => {
                                    if(sub.email == user_email){
                                        var submission = new Submission();
                                        submission.user_id = user.id;
                                        submission.user_email = user_email;
                                        submission.course_num = req.params.course_num;
                                        submission.assignment_num = req.params.assignment_num;
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

                                        course.save((err, courseObj) => {
                                            if (err) res.status(500).send(err);
                                            submission.save((err, submissionObj) => {
                                                if (err) res.status(500).send(err);
                                                else res.status(200).send(submissionObj);
                                            });
                                        });
                                    }
                                })
                            }
                        })   
                    }
                });   
            }
        });
    }

 }

/**
 * Updates a specified submission
 * @param req : User's request
 * @param res : The response back to the caller.
 * Sends back a JSON object of the updated submission.
 */

export function updateSubmission(req, res, next) {
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

export function deleteSubmission(req, res, next) {
    Submission.findByIdAndRemove(req.params.submission_id, (err, submissionObj) =>{
//        if (err) res.status(500).send(err);
        res.status(200).send(submissionObj);
    }).catch(next);
}