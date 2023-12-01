function errorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 400;
  err.message = err.message || 'something went wrong';
  return res
    .status(err.statusCode)
    .json({status: err.statusCode, error: err.message});
}

module.exports = errorHandler;
