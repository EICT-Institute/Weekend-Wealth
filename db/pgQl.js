const configs = require('dotenv').config().parsed;
const { Pool } = require('pg');
const logger = require('../utils/logger');
const { NODE_ENV } = require('../config/env');

const USER = configs.PGUSER_PR;
const HOST = configs.PGHOST_PR;
const DATABASE = configs.PGDATABASE_PR;
const PASSWORD = configs.PGPASSWORD_PR;
const PORT = configs.PGPORT_PR;

const dbPool = new Pool({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: PORT,
});

dbPool.connect().then(
  (status) => {
    console.log(
      `DB Connected, Host, conn: host: ${status.connectionParameters.host}, port: ${status.connectionParameters.port}`
    );
  },
  (e) => {
    // Send to slack, notify team
    logger.error({ ERROR: 'DB Connection failed', status: e.toString() });
  }
);

dbPool.on('error', (err, client) => {
  logger.error({ ERROR: 'DB ERROR', errors: err.toString(), client });
});

module.exports = dbPool;
