const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const {format} = require("date-fns");
const {v4: uuid} = require("uuid");

const logEvents = async (message, fileName) => {
	const date = format(new Date(), "yyyy/mm/dd\tHH:mm:ss");
	const id = uuid();

	const data = `${date}\t${id}\t${message}\n`;

	if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
		await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
	}

	try {
		await fsPromises.appendFile(
			path.join(path.join(__dirname, "..", "logs", fileName)),
			data
		);
	} catch (err) {
		console.log("error occured");
	}
};

const logger = (req, res, next) => {
	logEvents(
		`${req.headers.origin}\t${req.method}\t${req.url}`,
		"reqEvents.txt"
	);
	next();
};

module.exports = {logger, logEvents};
