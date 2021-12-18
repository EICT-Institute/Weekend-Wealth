const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;

module.exports = {
  NODE_ENV,
  PORT,
  LOG_PATH: 'errors/logs',
  JWT_SECRET,
};
