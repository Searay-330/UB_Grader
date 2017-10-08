const multer = require('multer');
const fs = require('fs-extra');

const rosterStorage = multer.diskStorage({ 
	destination: (req, file, cb) => {
		const course = req.params.course_num;
		const path = `./uploads/${course}`;
		fs.mkdirsSync(path);
		cb(null, path);
	},
	filename: (req, file, cb) => {
		const file_name = req.user.email+'-'+file.originalname;
		cb(null ,file_name);
	}
});

const rosterUpload = multer({storage: rosterStorage});

export default rosterUpload;