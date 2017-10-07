const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

const submissionsStorage = multer.diskStorage({ 
	destination: (req, file, cb) => {
		const assingment = req.params.assignment_num;
        const course = req.params.course_num;
		const path = `./uploads/${course}/${assingment}/submissions`;
		fs.mkdirsSync(path);
		cb(null, path);
	},
	filename: (req, file, cb) => {
		const file_name = 'temp11'+'-'+file.originalname;		
		cb(null ,file_name);
	}
});


const submissionsUpload = multer({ storage: submissionsStorage });

module.exports = {
    submissionsUpload : submissionsUpload
}