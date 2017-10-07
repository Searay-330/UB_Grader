import User from '../models/User'
import Course from '../models/Course'
import Submission from '../models/Submission'
import * as AuthCheck from '../util/authentication'

const request = require('request');

/**
 * Gets all the user submissions of a specific assignment.
 * @param req : User's request (should contain course_num, assignment_num, email as a parameter)
 * @param res : The response back to the caller.
 * Sends a list of the submissions of a user in a perticular assignment back as the response (a list of json objects)
 */

export function getUserSubmissions(req, res, next) {
    Submission.find({'user_email': req.params.email}, (err, submissions) => {
        if (err){
            res.status(500).send(err);   
        } else {
            var submissionList = []
            submissions.forEach((submission) => {
                if(submission.course_num == req.params.course_num && submission.assignment_num == req.params.assignment_num){
                    submissionList.push(submission);
                }
            });
            res.status(200).send(submissionList);   
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
            course.assignments.forEach((assignment) => {
                if(assignment.assignment_num == req.params.assignment_num){
                    assignment.user_submissions.forEach((sub) => {
                        if(sub.email == req.params.email){
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

export function getAllSubmissions(req, res, next) {
    Submission.find({"course_num":req.params.course_num}, (err, submissions) => {
        var submissionList = []
        submissions.forEach((submission) => {
            if(submission.assignment_num == req.params.assignment_num){
                submissionList.push(submission);
            }
        });
        res.status(200).send(submissionList);
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
    if (!req.files[0] || req.files.length > 1){
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
                                // assignment.user_submissions.forEach((sub) => {
                                //     if(sub.email == user_email){
                                //     submissionFound = true;   
                                //     }
                                // });
                                // if(!submissionFound){
                                //     assignment.user_submissions.push({
                                //     email: user_email,
                                //     submissions: 0
                                //     });
                                // }
                                // console.log(user.email);
                                assignment.user_submissions.forEach((sub) => {
                                    if(sub.email == user_email){
                                        var submission = new Submission();
                                        submission.user_id = user.id;
                                        submission.user_email = user_email;
                                        submission.course_num = req.params.course_num;
                                        submission.assignment_num = req.params.assignment_num;
                                        submission.file_name = req.files[0].filename;
                                        submission.version = sub.submissions;
                                        submission.feedback = "Placeholder";
                                        submission.form_data = "Placeholder";
                                        submission.grader = "Placeholder";
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