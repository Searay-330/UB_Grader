const request = require('request');
const fs = require('fs-extra');

var openURL = 'http://localhost:3000/open/test/';
var uploadURL = 'http://localhost:3000/upload/test/';

function openTango(course_num, assignment_num) {
    request.get(openURL + course_num + '/' + assignment_num + '/', function(err, response, body){
        if (err) return 0;
        else return 1;
    });
}


export function sendToTango(submission, assignment, course){
    if (openTango(course.course_num, assignment.assignment_num)){
        return 0;
    }
    else {
        var filecontent = fs.readFileSync(`./uploads/${submission.course_num}/${submission.assignment_num}/submissions/${submission.file_name}`, 'utf8');
        console.log("Was able to open!");
        var tangoReq = request({
            uri: uploadURL + course.course_num + '/' + assignment.assignment_num + '/',
            method: 'POST',
            headers: {
                'filename': assignment.form.file_name,
            },
            body: filecontent
        }, function (err, response, body) {
            if (err) {
                console.log(JSON.parse(body));
                console.log("Wasn't able to upload!");
            }
            else {
                console.log(JSON.parse(body));
            }
        });
        
    }       
}