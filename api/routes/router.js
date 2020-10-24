require('dotenv').config();

const express = require('express');
const router = express.Router();

const FileController = require('../../controllers/FileController');
const DataController = require('../../controllers/DataController');

router.get('/ping', (req, res) => {
	res.status(200).json({
		status: 'ok'
	})
});

router.post('/upload', FileController.uploadFile);

router.get('/parse', DataController.parseDataFile)

module.exports = router;