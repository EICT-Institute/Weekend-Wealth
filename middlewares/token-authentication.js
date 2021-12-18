const errors = require('../errors');
const config = require('../config/env');
const { verifyToken, generateToken } = require('../utils/token');

const JWT_SECRET = config.JWT_SECRET;

module.exports.tokenAuthentication = async (req, res, next) => {
  try {
    const auth = req.get('authorization');

    if (!auth) throw new errors.AuthenticationError(`Authorization required.`);
    if (!auth && config.NODE_ENV === 'test') return next();

    const [scheme, token] = auth.split(' ');

    if (scheme !== 'Bearer')
      throw new errors.AuthenticationError(`Authorization required.`);

    // fetch token
    const data = await verifyToken(token, JWT_SECRET);
    if (!data) throw new APIError('Authorization required', 401);

    next();
  } catch (error) {
    if (error instanceof errors.JsonWebTokenError) {
      const err = new errors.AuthenticationError('Authorization token is invalid.');

      next(err);
    } else next(error);
  }
};

module.exports.tokenGeneration = generateToken({ _id: `${new Date()}` });
