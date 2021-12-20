module.exports.internalServerErrorHandler = (errors, logger) => (err, req, res, next) => {
  // log error

  logger.error(err.stack);

  const e = new errors.InternalServerError();

  res.status(500);
  res.json(e);
};

module.exports.routeNotFoundErrorHandler = (errors) => (req, res, next) => {
  const e = new errors.RouteNotFoundError();

  res.status(404);
  res.json(e);
};

module.exports.authenticationErrorHandler = (errors) => (err, req, res, next) => {
  if (err instanceof errors.AuthenticationError) {
    res.status(401);
    res.json(err);
  } else next(err);
};

module.exports.conflictErrorHandler = (errors) => (err, req, res, next) => {
  if (err instanceof errors.ConflictError) {
    res.status(409);
    res.json(err);
  } else next(err);
};
