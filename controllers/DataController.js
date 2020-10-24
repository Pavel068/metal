const ExcelParser = require('../services/ExcelParser');

exports.parseDataFile = async (req, res) => {
	const ExcelParserInstance = new ExcelParser();

	res.status(200).json({
		data: ExcelParserInstance.parsePlav()
	});
}

exports.solve = async (req, res) => {

	res.status(200).json({});
}