const customError = require('../errors/customError');

function invalidRoute(req, res, next) {
  const error = new customError(`${req.originalUrl} Not found`);
  return next(error);
}
module.exports = invalidRoute;