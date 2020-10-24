require('dotenv').config();
require('datejs');

const express = require('express');
const app = express();
const port = 3000;

const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

app.use(morgan((tokens, req, res) => {
	return [
		(new Date).format('yy-m-d H:i:s'),
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens['response-time'](req, res), 'ms'
	].join(' ');
}));

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
	extended: false
}));

app.use(fileUpload({
	limits: { fileSize: 50 * 1024 * 1024 },
}));

const apiRouter = require('./api/routes/router');
app.use('/api', apiRouter);

app.listen(port, () => {
	console.log('App running');
})
