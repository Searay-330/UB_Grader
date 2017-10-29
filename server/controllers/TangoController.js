const request = require('request');
const fs = require('fs-extra');
import Submission from '../models/Submission'
import Course from '../models/Course'

var openURL = 'http://localhost:3000/open/test/';
var uploadURL = 'http://localhost:3000/upload/test/';
var addJobURL = 'http://localhost:3000/addJob/test/';

var lastLine = require('last-line');
var async = require('async');

function openTango(course_num, assignment_num) {
    var success = true;
    request.get(openURL + course_num + '-' + assignment_num + '/', function(err, response, body){
        if (err) {
            success = false;
        }
        else {
            success = true;
        }
    });
    console.log("Success: " + success);
    return success;
}

function uploadToTango(filename, filepath, url) {
    var file = fs.readFileSync(filepath);
    var success = true;
    var tangoReq = request({
        uri: url,
        method: 'POST',
        headers: {
            'filename': filename,
        },
        body: file
    }, function (err, response, body) {
        console.log(body);
        if (err) {
            success = false;
        }
        else {
            success = true;
        }
    });
    return success;
}



export function sendToTango(submission, assignment, course){
    if (!openTango(course.course_num, assignment.assignment_num)){
        console.log("Couldn't open Tango!");
        return false;
    }
    else {
        var url = uploadURL + course.course_num + '-' + assignment.assignment_num + '/';
        var submissionFile = `./uploads/${submission.course_num}/${submission.assignment_num}/submissions/${submission.file_name}`;
        var autogradeFile = `./uploads/${submission.course_num}/${submission.assignment_num}/Tango/autograde.tar`;
        var makeFile = `./uploads/${submission.course_num}/${submission.assignment_num}/Tango/autograde-Makefile`;
        var prefix = submission.user_email + '_' + submission.version + '_';
        if (!uploadToTango(submission.file_name, submissionFile, url)){
            return false;
        }
        console.log("Uploaded student file to Tango");
        if (!uploadToTango(prefix + 'Makefile', makeFile, url)){
            return false;
        }
        console.log("Uploaded Makefile to Tango");
        if (!uploadToTango(prefix + 'autograde.tar', autogradeFile, url)){
            return false;
        }
        console.log("Uploaded autograde.tar to Tango");

        console.log("Trying to add job!");
        var success = true;
        var addJob = request({
            uri: addJobURL + course.course_num + '-' + assignment.assignment_num + '/',
            method: 'POST',
            body: JSON.stringify({
                "image": "autograding_image",
                "files": [
                    {
                        "localFile": submission.file_name,
                        "destFile": assignment.form.file_name
                    },
                    {
                        "localFile": prefix + 'Makefile',
                        "destFile": 'Makefile'
                    },
                    {
                        "localFile": prefix + 'autograde.tar',
                        "destFile": 'autograde.tar'
                    }
                ],
                "jobName": prefix + "job",
                "output_file": prefix + "feedback.txt",
                "timeout": 180,
                "max_kb": 1024,
                "callback_url": 'http://localhost:8000/api/Tango/callback/' + course.course_num + '/' + assignment.assignment_num + '/' + submission._id
            })
        }, function (err, response, body) {
            console.log(body);
            if (err) {
                success = false;
            }
            else {
                success = true;
            }
        });
        console.log("Submitted job: " + success);
    }       
}

export async function callbackTango(req, res){
    res.status(200).send({});
    Submission.findById(req.params.submission_id, function(err, submission){
        var file = fs.readFileSync(`./uploads/${submission.course_num}/${submission.assignment_num}/feedback/${submission.user_email}_${submission.version}_feedback.txt`, 'utf8');
        submission.feedback = file;
        // var scoresList = []
        lastLine(`./uploads/${submission.course_num}/${submission.assignment_num}/feedback/${submission.user_email}_${submission.version}_feedback.txt`, function (err, temp) {
            try {
                var scoresList = []
                var output = JSON.parse(temp);
                var scoresJson = output.scores;
                for (var problem_name in scoresJson) {
                    if (scoresJson.hasOwnProperty(problem_name)) {
                    scoresList.push({
                        "problem_name" : problem_name,
                        "score"        : scoresJson[problem_name]
                    });
                    }
                }
                submission.set('scores', scoresList);
                submission.save((err, updatedSubmission) => {
                    if (err){
                        // res.status(500).send(err);
                    }          
                });
           } catch(e){
                var scoresList = []
                let course = await Course.findOne({'course_num': submission.course_num});
                let assignment = course.assignments.id(submission.assignment_num);

                assignment.problems.forEach((prob) => {
                    scoresList.push({
                        "problem_name" : prob.problem_name,
                        "score"        : 0
                    });
                });
                submission.set('scores', scoresList);
                submission.save((err, updatedSubmission) => {       
                });
           }
        });
    });
}