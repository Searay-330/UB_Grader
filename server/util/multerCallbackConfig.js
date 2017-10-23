const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
import Submission from '../models/Submission'

const callbackStorage = multer.diskStorage({ 
	destination: (req, file, cb) => {
		const assingment = req.params.assignment_num;
        const course = req.params.course_num;
		const path = `./uploads/${course}/${assingment}/feedback`;
		fs.mkdirsSync(path);
		cb(null, path);
	},
	filename: (req, file, cb) => {
		Submission.findById(req.params.submission_id, function(err, submission){
			const file_name = submission.user_email + '_' + submission.version + '_' + 'feedback.txt';
			cb(null ,file_name);
		});
		
	}
});

const callbackUpload = multer({storage: callbackStorage});

export default callbackUpload;