import multer from "multer";
import path from "path";

let storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "uploads/");
	},
	filename(req, file, cb) {
		let name = file.originalname.split(" ").join("-");
		cb(null, `${name}-${Date.now()}${path.extname(file.originalname)}`);
	},
});

let checkFileType = (file, cb) => {
	const fileTypes = /jpg|jpeg|png|csv|xlsx|pdf|xls/;
	const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
	const mimeType = fileTypes.test(file.mimetype);

	if (extName && mimeType) {
		return cb(null, true);
	} else {
		return cb(new Error('File Type Not Allowed'));
	}
};

export const upload = multer({
	storage,
	fileFilter(req, file, cb) {
		checkFileType(file, cb);
	},
	limit: 10000000
});
