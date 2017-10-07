const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
import Course from '../models/Course'


const submissionsStorage = multer.diskStorage({ 
	destination: (req, file, cb) => {
		const assingment = req.params.assignment_num;
        const course = req.params.course_num;
		const path = `./uploads/${course}/${assingment}/submissions`;
		fs.mkdirsSync(path);
		cb(null, path);
	},
	filename: (req, file, cb) => {
		Course.findOne({'course_num': req.params.course_num }, (err,course) =>{
			if (err){
				res.status(500).send(err);   
			} else {
				var submissionFound = false;
				course.assignments.forEach((assignment) => {
					if(assignment.assignment_num == req.params.assignment_num){
						assignment.user_submissions.forEach((sub) => {
							if(sub.email == req.user.email){
							submissionFound = true;   
							}
						});
						if(!submissionFound){
							assignment.user_submissions.push({
							email: req.user.email,
							submissions: 0
							});
						}
						assignment.user_submissions.forEach((sub) => {
							if(sub.email == req.user.email){
								var version = sub.submissions;
								version += 1;
								sub.submissions = version;
								course.save((err, courseObj) => {
									if (err) res.status(500).send(err);
									else {
										const file_name = req.user.email+"_"+version+"_"+"handin.c";
										cb(null ,file_name);
									}
								});
							}
						})
					}
				})   
			}
		});   

	}
});

var submissionsUpload = multer({ storage: submissionsStorage });

export default submissionsUpload;