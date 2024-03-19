const { validationResult } = require('express-validator');

const handleErrCatch = (err, next, statusCode = 500) => {
  if(!err.statusCode) {
    err.statusCode = statusCode;
  }
  next(err);
};

const handleNotFound = (model, propertyName, next) => {
  if(!model) {
    const error = new Error(`${ propertyName } not found`);
    error.statusCode = 404;
    throw error;
  }
};

const handleValidationErrors = (req) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = new Error('Validation faild, entered data is incorrect');
    error.statusCode = 422;
    error.validationErrors = errors.array();
    throw error;
  }
};

const authorized = (obj, req) => {
  if(obj.creator.toString() !== req.userId) {
    const error = new Error('Not authorized!');
    error.statusCode = 403;
    throw error;
  }
};

module.exports = {
  handleErrCatch,
  handleNotFound,
  handleValidationErrors,
  authorized
};