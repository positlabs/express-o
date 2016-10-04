// https://github.com/winstonjs/winston
const winston = require('winston')

// for appengine... https://www.npmjs.com/package/winston-gae
 
var logger = new winston.Logger({
	transports: [
		new winston.transports.Console(),
	]
})

/*
	logger.default('this is a default message');
	logger.debug('this is a debug message');
	logger.info('this is my normal message');
	logger.notice('this is a notice');
	logger.warning('this is a warning');
	logger.error('this is an error message');
	logger.critical('this is a critical message');
	logger.alert('this is an alert');
	logger.emergency('this is an emergency');
*/

module.exports = logger
