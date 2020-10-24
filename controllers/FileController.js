const fs = require('fs');
const path = require('path');

exports.uploadFile = async (req, res) => {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}

	// Clear directory
	const dir_files = fs.readdirSync(path.resolve(__dirname, '../storage'));
	for (const file of dir_files) {
		fs.unlinkSync(path.resolve(__dirname, `../storage/${file}`));
	}

	if (req.files.files[0]) {
		for (const uploaded_file of req.files.files) {
			let filename = `${uploaded_file.md5}.${uploaded_file.mimetype.split('/')[1]}`;
			let file = path.resolve(__dirname, '../storage/' + filename);
			await uploaded_file.mv(file);
		}
	} else {
		let uploaded_file = req.files.files;
		let filename = `${uploaded_file.md5}.${uploaded_file.mimetype.split('/')[1]}`;
		let file = path.resolve(__dirname, '../storage/' + filename);
		await uploaded_file.mv(file);
	}

	res.status(200).json({
		status: 'ok'
	});
}