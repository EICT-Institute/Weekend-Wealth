const { createLogger, format, transports } = require('winston');
const path = require('path');

const { LOG_PATH } = require('../config/env');
const { NODE_ENV } = require('../config/env');

const formatOptions = format.combine(
  format.timestamp({ format: 'YYYY-MM--DD HH:mm:ss' }),
  format.printf((log) => `${log.timestamp} :: ${log.message}`)
);

const logger = createLogger({
  level: 'info',
  format: formatOptions,
  defaultMeta: { service: 'api-service' },
  transports: [
    new transports.File({ filename: path.join(LOG_PATH, '/error.log'), level: 'error' }),
  ],
});

const productionFormatOptions = format.combine(format.colorize(), format.simple());

// print logs in console if environment is in production

if (NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: productionFormatOptions,
    })
  );
}

module.exports = logger;
