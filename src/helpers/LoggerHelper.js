var appRoot = require('app-root-path');
var moment = require('moment');

const { format, createLogger, transports } = require("winston");

const { combine, timestamp, label, printf } = format;

const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${moment().format('YYYY-MM-DD HH:mm:ss')} [${label}] ${level.toUpperCase()}: ${message}`;
});

var dateNow = moment().format('YYYY-MM-DD');

var options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app-${dateNow}.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, //ukuran file maksimal 5MB
        maxFiles: 5,
        colorize: false,
    },
    // console: {
    //     level: 'debug',
    //     handleExceptions: true,
    //     json: false,
    //     colorize: true,
    // },
};

const logger = createLogger({
    format: combine(label({ label: 'LOGGER' }), timestamp(), customFormat),
    transports: [
        new transports.File(options.file),
        // new transports.Console(options.console)
    ],
});

/* LOGGER EXAMPLES
    app.logger.trace('testing');
    app.logger.debug('testing');
    app.logger.info('testing');
    app.logger.warn('testing');
    app.logger.crit('testing');
    app.logger.fatal('testing');
*/

module.exports = logger;