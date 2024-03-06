const handleErrCatch = (err, next, statusCode = 500) => {
  if(!err.statusCode) {
    err.statusCode = statusCode;
  }
  next(err);
};

module.exports = { handleErrCatch };