/**
 * Create internal server error instance.
 *
 * Returns internal server error instance.
 */

module.exports = class AuthenticationError extends Error {
  constructor(message, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthenticationError);
    }

    this.name = 'AuthenticationError';
    this.date = new Date();
    this.message = message;
  }
};
