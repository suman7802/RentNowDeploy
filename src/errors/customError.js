class customError extends Error {
  constructor(errorMessage, errorCode) {
    super(errorMessage);
    (this.statusCode = errorCode),
      (this.status = errorCode > 400 && errorCode < 500 ? 'error' : 'fail'),
      (this.isOperational = true);
  }
}

module.exports = customError;
