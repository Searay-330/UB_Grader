const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

const tangoStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		const course = req.params.course_num;
		const assignment = req.body.id;
		const path = `./uploads/${course}/${assignment}/Tango`
		fs.mkdirsSync(path);
		cb(null, path);
	},
	filename: (req, file, cb) => {
		if (path.extname(file.originalname)	== '.tar'){
			cb(null, "autograde.tar");
		}	
		else {
			cb(null, "autograde-Makefile");
		}
	}
});

const tangoUpload = multer({storage: tangoStorage});

export default tangoUpload;